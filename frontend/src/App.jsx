import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RegisterOrLogin from './components/RegisterOrLogin/RegisterOrLogin';
import Contact from './components/Contact/contact';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RegisterOrLogin />}/>
          <Route path='/contact' element={<Contact />} />
          {/* <Route index element={<Home />} />
          <Route index element={<Home />} />
          <Route index element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;