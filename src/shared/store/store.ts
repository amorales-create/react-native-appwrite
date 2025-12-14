import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/store/authSlice';
import productsReducer from '../../features/products/store/productsSlice';
import themeReducer from '../theme/themeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
