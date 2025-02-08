import { configureStore } from '@reduxjs/toolkit';
import user from './features/users/userSlice';
import product from './features/products/productSlice';
import warehouse from './features/warehouse/warehouseSlice';


const store = configureStore({
    reducer: {
        users:user,
        products:product,
        warehouses:warehouse
    },
});

export default store;
