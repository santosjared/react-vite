import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/users/userSlice';


const store = configureStore({
    reducer: {
        users:userSlice
    },
});

export default store;
