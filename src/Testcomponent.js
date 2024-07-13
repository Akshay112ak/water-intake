import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/Authslice';

const TestComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const handleLogin = () => {
        const testUser = { email: 'test@example.com', password: 'password123', userid: '12345' };
        dispatch(setUser(testUser));
    };

    const handleCheckLocalStorage = () => {
        const localStorageUser = window.localStorage.getItem('user');
        console.log("Local storage user:", localStorageUser);
    };

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleCheckLocalStorage}>Check Local Storage</button>
            <div>
                <h2>User from Redux State:</h2>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </div>
    );
};

export default TestComponent;
