import { OAuthProvider } from 'react-native-appwrite';
import { account } from '../../../lib/appwrite';
import { User } from '../../../shared/types';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
function normalizeUser(raw: any): User {
    return {
        id: raw.$id ?? raw.id,
        email: raw.email,
        name: raw.name,
        type: 'google' in raw || raw.provider === 'google' ? 'google' : 'email',
    };
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
    await account.createEmailPasswordSession(email, password as string);
    const me = await account.get();
    console.log('Account get after login:', me);
    return normalizeUser(me);
}

export async function registerWithEmail(email: string, password: string, name?: string): Promise<User> {
    // Appwrite requires an ID for create; 'unique()' lets the server generate one
    await account.create('unique()', email, password, name);
    // After creating, create a session
    await account.createSession(email, password);
    const me = await account.get();
    return normalizeUser(me);
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const me = await account.get();
        return normalizeUser(me);
    } catch (err) {
        return null;
    }
}

export async function logout(): Promise<void> {
    console.log(account)
    await account.deleteSession('current');
}

/**
 * Starts an OAuth2 session for Google. On web this redirects the browser.
 * On mobile you must provide valid redirect URLs configured in Appwrite
 * and handle the incoming redirect in your app (e.g., via Linking or a custom scheme).
 */
export async function loginWithGoogle(): Promise<User> {
   try {
            const redirectUri = Linking.createURL('/');
            // @ts-ignore: OAuthProvider type mismatch in some SDK versions
            const response = await account.createOAuth2Token('google', redirectUri, redirectUri);

            if (!response) throw new Error('Failed to create OAuth2 token');

            const result = await WebBrowser.openAuthSessionAsync(response.toString(), redirectUri);

            if (result.type !== 'success')  throw new Error('User cancelled or authentication failed');

            const url = new URL(result.url);
            const secret = url.searchParams.get('secret');
            const userId = url.searchParams.get('userId');

            if (!secret || !userId) throw new Error('Failed to get secret or userId');

            await account.createSession(userId, secret);
            const me = await account.get();
            return normalizeUser(me);
        } catch (error: any) {
            throw new Error('Login with Google failed: ' + error.message);
        }
    }
