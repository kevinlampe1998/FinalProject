import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="layout">
            <header>
                <h1>End Project</h1>
                <nav className="nav-layout">
                    <li>
                        <Link to="/">Register/Login</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/team">Team</Link>
                    </li>
                    {/* <Link to='/home'>Home</Link> */}
                </nav>
            </header>

            <Outlet />

            <footer>
                {/* <Link to='/'>About</Link> */}
                <Link to="/contact">Contact</Link>
            </footer>
        </div>
    );
};

export default Layout;
