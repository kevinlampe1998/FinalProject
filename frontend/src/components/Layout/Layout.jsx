import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    return (
        <div className='layout'>
            <h1>End Project</h1>
            <nav className='nav-layout'>
                <Link to='/register-or-login'>Register/Login</Link>
                <Link to='/'>Home</Link>
                <Link to='/'>About</Link>
                <Link to='/'>Contact</Link>
            </nav>

            <Outlet/>

        </div>
    );
};

export default Layout;