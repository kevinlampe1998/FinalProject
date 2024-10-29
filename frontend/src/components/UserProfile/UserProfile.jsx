import './UserProfile.css';
import { useContext } from 'react';
import { TheContext } from '../../App';

const Profile = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    const logout = async () => {
        const res = await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();

        dispatch({ type: 'users-logout' });
    };

    return (
        <section className="profile">
                <button onClick={logout} href="#">Logout</button>
        </section>
    );
};

export default Profile;