import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState, useContext, useRef, useEffect } from "react";
import RegisterOrLogin from "../RegisterOrLogin/RegisterOrLogin";
import { TheContext } from "../../App";

const Layout = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const helpPopUp = useRef();
    const navigate = useNavigate();

    const hideHelp = () => {
        localStorage.setItem('hideHelpPopUp', new Date().getTime());
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

        dispatch({ type: 'users-logout' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    useEffect(() => {
        if ((new Date().getTime() - localStorage.getItem('hideHelpPopUp')) > 43_200_200) {
            helpPopUp.current.style.display = 'block';
        } else {
            helpPopUp.current.style.display = 'none';
        }
        !localDataBank.user &&
        (helpPopUp.current.style.display = 'none');
    }, []);

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
                                <Link to="/team">Team</Link>
                            </li>
                            <li>
                                <Link to='/products'>Products</Link>
                            </li>
                            <li>
                                <a style={{ background: '#f50' }} onClick={logout} href="#">Logout</a>
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
                            <Link to="/contact" onClick={scrollToTop}>Contact</Link>
                            <Link to="/rating" onClick={scrollToTop}>Rating</Link>
                            <Link to="/help-chat" onClick={scrollToTop}>Help-Chat</Link>
                            <Link>FAQ</Link>
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
