import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducer/userSlice';
import menuItemsSlice from './reducer/menuItemsSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        menuItems: menuItemsSlice,
    },
})