import './RegisterOrLogin.css';
import { useRef, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TheContext } from '../../App';

const RegisterOrLogin = () => {
    const decideSection = useRef();
    const registerForm = useRef();
    const loginForm = useRef();

    const { localDataBank, dispatch } = useContext(TheContext);

    const openRegister = () => {
        decideSection.current.style.display = 'none';
        registerForm.current.style.display = 'flex';
    };

    const openLogin = () => {
        decideSection.current.style.display = 'none';
        loginForm.current.style.display = 'flex';
    };

    const postRegister = async (e) => {
        e.preventDefault();

        const firstName = e.target.children[2].value;

        const lastName = e.target.children[4].value;

        const email = e.target.children[6].value;

        const street = e.target.children[8].value;

        const postalCode = e.target.children[10].value;

        const town = e.target.children[12].value;

        const birthDay = e.target.children[14].value;

        const password = e.target.children[16].value;

        const res = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, street, postalCode, town,
                birthDay, password }),
            headers: { 'content-type': 'application/json' }
        });

        const data = await res.json();

        dispatch({ type: 'users-login', payload: data.savedUser });

    };

    const postLogin = async (e) => {
        e.preventDefault();

        const email = e.target.children[2].value;
        const password = e.target.children[4].value;

        console.log(email, password);

        const res = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'content-type': 'application/json' },
            credentials: 'include'
        });

        const data = await res.json();

        if (data.admin) {
            alert('Admin logged in!');

            dispatch({ type: 'admin-login', payload: data.admin });
            return;
        }

        dispatch({ type: 'users-login', payload: data.searchedUser });

    };

    return (
        <div className="register-or-login">

            <section className='decide-register-or-login' ref={decideSection}>

                <button onClick={openRegister}>Register</button>
                <button onClick={openLogin}>Login</button>

            </section>

            <form className='register' ref={registerForm} onSubmit={postRegister}>

                <h2>Register</h2>

                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName'/>

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName'/>

                <label htmlFor="email-register">Email</label>
                <input type="email" id='email-register'/>

                <label htmlFor="street">Street</label>
                <input type="text" id='street'/>

                <label htmlFor="postalCode">Postal Code</label>
                <input type="number" id='postalCode'/>

                <label htmlFor="town">Town</label>
                <input type="text" id='town'/>

                <label htmlFor="birthDay">Birthday</label>
                <input type="date" id='birthDay'/>

                <label htmlFor="password-register">Password</label>
                <input type="password" id='password-register'/>

                <button type='submit'>Submit</button>

            </form>

            <form className='login' ref={loginForm} onSubmit={postLogin}>

                <h2>Login</h2>

                <label htmlFor="email-login">Email</label>
                <input type="text" id='email-login'/>

                <label htmlFor="password-login">Password</label>
                <input type="password" id='password-login'/>

                <button type='submit'>Submit</button>

            </form>

        </div>
    );
};

export default RegisterOrLogin;