import { useReducer, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';
import Contact from './components/Contact/Contact.jsx';
import TeamProject from './components/TeamProject/TeamProject.jsx';
import NewInStore from './components/NewInStore/NewInStore.jsx';
import SetUsedProduct from './components/SetUsedProduct/SetUsedProduct.jsx';
import HelpChat from './components/HelpChat/HelpChat.jsx';
import Rating from './components/Rating/Rating.jsx';
import UsedItems from './components/UsedItems/UsedItems.jsx';
import UsedItem from './components/UsedItem/UsedItem.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';

const initialState = {
  user: undefined
};

const reducer = (state, action) => {
  if (action.type === 'users-register' || action.type === 'users-login') {
    return { ...state, user: action.payload };
  }

  if (action.type === 'users-logout') {
    return { ...state, user: undefined };
  }
  return state;
};

export const TheContext = createContext();

const App = () => {
  const [localDataBank, dispatch] = useReducer( reducer, initialState );

  const loginAtStart = async () => {
    try {
      const res = await fetch('http://localhost:3000/users/login-at-start', {
        method: 'POST',
        credentials: 'include'
      });
  
      const data = await res.json();
  
      dispatch({ type: 'users-login', payload: data.searchedUser });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loginAtStart();
  }, []);

  return (
    <TheContext.Provider value={{ localDataBank, dispatch }}>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Layout />}>

            <Route path='/' element={<NewInStore />} />
            <Route path='/used-items' element={<UsedItems />} />
            <Route path='/user-profile' element={<UserProfile />} />

            <Route path='/contact' element={<Contact />} />
            <Route path='/team' element={<TeamProject />} />
            <Route path='/set-used-item' element={<SetUsedProduct />} />
            <Route path='/used-item/:_id' element={<UsedItem />} />
            <Route path='/help-chat' element={<HelpChat />} />
            <Route path='/rating' element={<Rating />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </TheContext.Provider>
  )
}

export default App;