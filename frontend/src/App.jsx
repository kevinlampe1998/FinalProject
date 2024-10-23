import { useReducer, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import RegisterOrLogin from './components/RegisterOrLogin/RegisterOrLogin';
import Contact from './components/Contact/contact';
import TeamProject from './components/Teamproject/TeamProject.jsx';
import Home from './components/Home/Home.jsx';
import SetProduct from './components/SetProduct/SetProduct.jsx';
import Products from './components/Products/Products.jsx';
import HelpChat from './components/HelpChat/HelpChat.jsx';

const initialState = {
  user: undefined
};

const reducer = (state, action) => {
  if (action.type === 'users-register' || action.type === 'users-login') {
    return { user: action.payload };
  }

  if (action.type === 'users-logout') {
    return { user: undefined };
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

            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/team' element={<TeamProject />} />
            <Route path='/products' element={<Products />} />
            <Route path='/set-product' element={<SetProduct />} />
            <Route path='/help-chat' element={<HelpChat />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </TheContext.Provider>
  )
}

export default App;