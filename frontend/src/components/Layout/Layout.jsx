import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState, useContext, useRef } from "react";
import RegisterOrLogin from "../RegisterOrLogin/RegisterOrLogin";
import { TheContext } from "../../App";

const Layout = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const helpPopUp = useRef();
    const navigate = useNavigate();

    const hideHelp = () => {
        helpPopUp.current.style.display = 'none';
    };

    const navigateToHelp = () => {
        navigate('/help-chat');
        helpPopUp.current.style.display = 'none';
    };

    const logout = async () => {
        const res = await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data.message);

        dispatch({ type: 'users-logout' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="layout">
            <header>
                <h1 className="project-name">Final Project</h1>

                {
                    localDataBank.user ? 
                        <nav className="nav-layout">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link to="/team">Team</Link>
                            </li>
                            <li>
                                <Link to='/products'>Products</Link>
                            </li>
                            <li>
                                <a onClick={logout} href="#">Logout</a>
                            </li>
                            <li>
                                <a href="#">{ localDataBank.user.firstName }</a>
                            </li>
                        </nav>
                    : <RegisterOrLogin/> 
                }
            </header>

                {
                    localDataBank.user && <Outlet/>
                }

                {
                    localDataBank.user &&
                        <footer>
                            {/* <Link to='/'>About</Link> */}
                            <Link to="/contact">Contact</Link>
                            <Link to="/rating">Rating</Link>
                        </footer>
                }

                <div className="help-chat-pop-up" ref={helpPopUp}>
                    <h5>Do you need help?</h5>
                    <div>
                        <button onClick={hideHelp}>No, please hide</button>
                        <button onClick={navigateToHelp}>Yes, please open help chat</button>
                    </div>
                </div>
        </div>
    );
};

export default Layout;
