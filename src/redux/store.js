import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Authslice';

var store=configureStore({
    reducer:{
        auth:authReducer
    }
});
export default store;