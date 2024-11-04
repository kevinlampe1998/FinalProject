import './UserProfile.css';
import { useContext } from 'react';
import { TheContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const navigate = useNavigate();

    const logout = async () => {
        const res = await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();

        dispatch({ type: 'users-logout' });
    };

    const navigateToSeeMyProducts = () => {
        navigate('/see-my-products');
    };

    return (
        <section className="profile">
                <button onClick={logout} href="#">Logout</button>
                <button onClick={navigateToSeeMyProducts}>See my Products</button>
                <button>Settings</button>
                <button>My Profile Data</button>
        </section>
    );
};

export default Profile;