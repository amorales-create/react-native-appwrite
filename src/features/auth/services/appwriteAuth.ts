import { account } from '../../../lib/appwrite';
import { User } from '../../../shared/types';

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
    await account.deleteSession('current');
}

/**
 * Starts an OAuth2 session for Google. On web this redirects the browser.
 * On mobile you must provide valid redirect URLs configured in Appwrite
 * and handle the incoming redirect in your app (e.g., via Linking or a custom scheme).
 */
export async function loginWithGoogle(successUrl: string, failureUrl: string): Promise<void> {
    if (!successUrl || !failureUrl) {
        throw new Error('OAuth redirect URLs not provided');
    }
    // This will attempt to start the OAuth2 flow. Behavior differs between platforms.
    await account.createOAuth2Session('google' as any, successUrl, failureUrl);
}
