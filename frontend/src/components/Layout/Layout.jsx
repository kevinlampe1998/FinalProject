import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import { useState, useContext } from "react";
import RegisterOrLogin from "../RegisterOrLogin/RegisterOrLogin";
import { TheContext } from "../../App";
import HelpChat from "../HelpChat/HelpChat";

const Layout = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

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
                        </footer>
                }
            <HelpChat/>
        </div>
    );
};

export default Layout;
