import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import { useState, useContext } from "react";
import RegisterOrLogin from "../RegisterOrLogin/RegisterOrLogin";
import { TheContext } from "../../App";

const Layout = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    return (
        <div className="layout">
            <header>
                <h1 className="project-name">End Project</h1>

                {
                    localDataBank.user ? 
                        <nav className="nav-layout">
                            {/* <li> */}
                                {/* <Link to="/">Register/Login</Link> */}
                            {/* </li> */}
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {/* <li>
                                <Link to="/about">About</Link>
                            </li> */}
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link to="/team">Team</Link>
                            </li>
                            {/* <Link to='/home'>Home</Link> */}
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

        </div>
    );
};

export default Layout;
