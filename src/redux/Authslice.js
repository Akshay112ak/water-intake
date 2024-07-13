import { createSlice } from '@reduxjs/toolkit';

export const authslice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true // Initial loading state
    },
    reducers: {
        setUser: (state, action) => {
            console.log("Action payload in reducer:", action.payload);
            state.user = action.payload;
            state.loading = false;
            window.localStorage.setItem('user', JSON.stringify(action.payload));
            console.log('User set in localStorage:', JSON.stringify(action.payload));
        },
        removeUser: (state) => {
            state.user = null;
            state.loading = false;
            window.localStorage.removeItem('user');
            console.log('User removed from localStorage');
        },
        setUserFromLocalStorage: (state) => {
            const user = window.localStorage.getItem('user');
            if (user) {
                console.log("User found in localStorage:", user);
                state.user = JSON.parse(user);
            } else {
                console.log("No user found in localStorage");
                state.user = null;
            }
            state.loading = false;
        }
    }
});

export const { setUser, removeUser, setUserFromLocalStorage } = authslice.actions;

export default authslice.reducer;
