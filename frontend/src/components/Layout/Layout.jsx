import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState, useContext, useRef, useEffect } from "react";
import RegisterOrLogin from "../RegisterOrLogin/RegisterOrLogin";
import { TheContext } from "../../App";
import ShoppingCartLogo from '/svg/shopping-cart.svg';
import Admin from "../Admin/Admin.jsx";

const Layout = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const helpPopUp = useRef();
    const navigate = useNavigate();

    const hideHelp = () => {
        localStorage.setItem('hideHelpPopUp', new Date().getTime());
        helpPopUp.current.style.display = 'none';
    };

    const navigateToHelp = () => {
        navigate('/help-chat');
        helpPopUp.current.style.display = 'none';
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

    // useEffect(() => {
    //     console.log(localDataBank.admin);
    // });

    return (
        <div className="layout">
            <header>
                <h1 className="project-name">
                    <div>Tech Oase</div>
                </h1>

                {
                    localDataBank.user ? 
                        <nav className="nav-layout">
                                <Link to="/">New in Store</Link>
                                <Link to='/used-items'>Used Items</Link>
                                <Link to='/user-profile'>{ localDataBank.user.firstName }</Link>
                            {/* <li>
                                <Link to='/shopping-cart'>
                                    <img src="/svg/shopping-cart.svg" alt="shopping-cart-logo" className="shopping-cart-logo"/>
                                </Link>
                            </li> */}
                        </nav>
                    : localDataBank.admin ?
                        <></>
                    : <RegisterOrLogin/>
                        
                }
            </header>

                {
                    localDataBank.user ? <Outlet/> : localDataBank.admin ? <Admin /> : <></>
                }

                {
                    localDataBank.user &&
                        <footer>
                            <Link to="/contact" onClick={scrollToTop}>Contact</Link>
                            <Link to="/rating" onClick={scrollToTop}>Rating</Link>
                            <Link to="/help-chat" onClick={scrollToTop}>Help-Chat</Link>
                            <Link to="/team" onClick={scrollToTop}>Team</Link>
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
