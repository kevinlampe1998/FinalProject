import { useReducer, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RegisterOrLogin from './components/RegisterOrLogin/RegisterOrLogin';
import Contact from './components/Contact/contact';
import TeamProject from './components/Teamproject/TeamProject.jsx';
import Home from './components/Home/Home.jsx';

const initialState = {
  user: undefined
};

const reducer = (state, action) => {
  if (action.type === 'users-register' || action.type === 'users-login') {
    return { user: action.payload };
  }

  return state;
};

export const TheContext = createContext();

const App = () => {
  const [localDataBank, dispatch] = useReducer( reducer, initialState );

  const loginAtStart = async () => {
    try {
      console.log('loginAtStart');

      const res = await fetch('http://localhost:3000/users/login-at-start', {
        method: 'POST',
        credentials: 'include'
      });
  
      const data = await res.json();
  
      console.log(data);

      dispatch({ type: 'users-login', payload: data.searchedUser });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('localDataBank.user', localDataBank.user);
  });

  useEffect(() => {
    loginAtStart();
  }, []);

  return (
    <TheContext.Provider value={{ localDataBank, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<RegisterOrLogin />}/> */}
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/team' element={<TeamProject />} />
            {/* <Route index element={<Home />} />
            <Route index element={<Home />} />
            <Route index element={<Home />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TheContext.Provider>
  )
}

export default App;