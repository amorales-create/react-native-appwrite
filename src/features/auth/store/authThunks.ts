import { AppDispatch } from '../../../shared/store/store';
import { getCurrentUser, loginWithEmail, loginWithGoogle, logout as appwriteLogout } from '../services/appwriteAuth';
import { registerWithEmail } from '../services/appwriteAuth';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from './authSlice';

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const user = await loginWithEmail(email, password);
        console.log('Logged in user:', user);
        dispatch(loginSuccess(user));
    } catch (err: any) {
        dispatch(loginFailure(err?.message ?? 'Login failed'));
    }
};

export const fetchCurrentUser = () => async (dispatch: AppDispatch) => {
    try {
        const user = await getCurrentUser();
        if (user) dispatch(loginSuccess(user));
    } catch (err) {
        // ignore silently
    }
};

export const loginWithGoogleThunk = (successUrl: string, failureUrl: string) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        await loginWithGoogle(successUrl, failureUrl);
        // OAuth flow will handle redirect and session creation; caller should then call fetchCurrentUser
    } catch (err: any) {
        dispatch(loginFailure(err?.message ?? 'Google login failed'));
    }
};

export const registerUser = (email: string, password: string, name?: string) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const user = await registerWithEmail(email, password, name);
        dispatch(loginSuccess(user));
    } catch (err: any) {
        dispatch(loginFailure(err?.message ?? 'Registration failed'));
    }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
    try {
        await appwriteLogout();
    } finally {
        dispatch(logoutAction());
    }
};
