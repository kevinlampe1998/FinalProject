import './RegisterOrLogin.css';
import { useRef } from 'react';

const RegisterOrLogin = () => {
    const decideSection = useRef();
    const registerForm = useRef();
    const loginForm = useRef();

    const openRegister = () => {
        decideSection.current.style.display = 'none';
        registerForm.current.style.display = 'flex';
    };

    const openLogin = () => {
        decideSection.current.style.display = 'none';
        loginForm.current.style.display = 'flex';
    };

    const postRegister = (e) => {
        e.preventDefault();
    };
    const postLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="register-or-login">

            <section className='decide-register-or-login' ref={decideSection}>

                <button onClick={openRegister}>Register</button>
                <button onClick={openLogin}>Login</button>

            </section>

            <form className='register' ref={registerForm} onSubmit={postRegister}>

                <h2>Register</h2>

                <label htmlFor="">First Name</label>
                <input type="text" />

                <label htmlFor="">Last Name</label>
                <input type="text" />

                <label htmlFor="">Email</label>
                <input type="text" />

                <label htmlFor="">Street</label>
                <input type="text" />

                <label htmlFor="">Postal Code</label>
                <input type="text" />

                <label htmlFor="">Country</label>
                <input type="text" />

                <label htmlFor="">Birthday</label>
                <input type="date" />

                <label htmlFor="">Password</label>
                <input type="text" />

                <button type='submit'>Submit</button>

            </form>

            <form className='login' ref={loginForm} onSubmit={postLogin}>

                <h2>Login</h2>

                <label htmlFor="">Email</label>
                <input type="text" />

                <label htmlFor="">Password</label>
                <input type="text" />

                <button type='submit'>Submit</button>

            </form>

        </div>
    );
};

export default RegisterOrLogin;