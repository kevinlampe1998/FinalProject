import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RegisterOrLogin from './components/RegisterOrLogin/RegisterOrLogin';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/register-or-login' element={<RegisterOrLogin />}/>
          {/* <Route index element={<Home />} />
          <Route index element={<Home />} />
          <Route index element={<Home />} />
          <Route index element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
