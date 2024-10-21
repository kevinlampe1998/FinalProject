import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    return (
        <div className='layout'>
            <header>
                <h1>End Project</h1>
                <nav className='nav-layout'>
                    <Link to='/'>Register/Login</Link>
                    {/* <Link to='/home'>Home</Link> */}
                </nav>
            </header>

            <Outlet/>

            <footer>
                {/* <Link to='/'>About</Link> */}
                <Link to='/contact'>Contact</Link>
            </footer>
        </div>
    );
};

export default Layout;