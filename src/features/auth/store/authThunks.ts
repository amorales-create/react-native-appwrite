import { AppDispatch } from '../../../shared/store/store';
import { getCurrentUser, loginWithEmail, loginWithGoogle, logout as appwriteLogout } from '../services/appwriteAuth';
import { registerWithEmail } from '../services/appwriteAuth';
import { loginStart, logoutStart, loginSuccess, loginFailure, logoutFailure, logout as logoutAction } from './authSlice';

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
        const user = await loginWithGoogle();
         if (user) dispatch(loginSuccess(user))
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
    dispatch(logoutStart());
    try {
        console.log('Logging out user');
        await appwriteLogout();
        dispatch(logoutAction());
        return { success: true };
    } catch (err: any) {
        // Surface the logout error in state but clear local session
        dispatch(logoutFailure(err?.message ?? 'Logout failed'));
        dispatch(logoutAction());
        return { success: false, error: err?.message ?? 'Logout failed' };
    }
};
