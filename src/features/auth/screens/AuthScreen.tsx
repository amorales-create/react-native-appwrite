import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { loginSuccess } from '../store/authSlice';
import { loginUser, loginWithGoogleThunk, registerUser } from '../store/authThunks';
import { toggleTheme } from '../../../shared/theme/themeSlice';
import { LoginForm } from '../components/LoginForm';
import { Button } from '../../../shared/components/Button';
import { LOG_MESSAGES, DEFAULTS, DIVIDER, THEME_EMOJI, ICONS, AUTH } from '../../../shared/constants/ui';

export const AuthScreen = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.mode);
    const isDark = theme === 'dark';
    const authLoading = useAppSelector((state) => state.auth.loading);

    const handleEmailLogin = (data: { email: string; password: string }) => {
        dispatch(loginUser(data.email, data.password));
    };

    const handleGoogleLogin = () => {
        if (authLoading) return;
        // Kick off OAuth2 flow. Ensure redirect URLs are configured in Appwrite.
        const success = process.env.EXPO_PUBLIC_APPWRITE_OAUTH_SUCCESS_URL ?? '';
        const failure = process.env.EXPO_PUBLIC_APPWRITE_OAUTH_FAILURE_URL ?? '';
        dispatch(loginWithGoogleThunk(success, failure));
    };

    const handleGuestLogin = () => {
        if (authLoading) return;
        dispatch(
            loginSuccess({
                id: AUTH.GUEST_ID,
                name: DEFAULTS.GUEST_NAME,
                type: 'guest',
            })
        );
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView
                className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}
                contentContainerClassName="flex-grow"
            >
                <View className="flex-1 px-6 pt-16 pb-8">
                    {/* Header with controls */}
                    <View className="flex-row justify-end mb-8 space-x-3">
                        {/* Language Toggle */}
                        <TouchableOpacity
                            onPress={toggleLanguage}
                            className={`px-4 py-2 rounded-lg ${isDark ? 'bg-dark-surface' : 'bg-light-surface'
                                }`}
                            activeOpacity={0.7}
                        >
                            <Text
                                className={`text-sm font-medium ${isDark ? 'text-dark-text' : 'text-light-text'
                                    }`}
                            >
                                {i18n.language.toUpperCase()}
                            </Text>
                        </TouchableOpacity>

                        {/* Theme Toggle */}
                        <TouchableOpacity
                            onPress={() => dispatch(toggleTheme())}
                            className={`px-4 py-2 rounded-lg ${isDark ? 'bg-dark-surface' : 'bg-light-surface'
                                }`}
                            activeOpacity={0.7}
                        >
                            <Text className="text-xl">{isDark ? THEME_EMOJI.DARK : THEME_EMOJI.LIGHT}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Title */}
                    <View className="mb-12">
                        <Text
                            className={`text-4xl font-bold mb-2 ${isDark ? 'text-dark-text' : 'text-light-text'
                                }`}
                        >
                            {t('auth.title')}
                        </Text>
                        <Text
                            className={`text-lg ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                                }`}
                        >
                            {t('auth.subtitle')}
                        </Text>
                    </View>

                    {/* Login Form */}
                    <View className="mb-6">
                        <LoginForm onSubmit={handleEmailLogin} onSignup={(data) => dispatch(registerUser(data.email, data.password))} />
                    </View>

                    {/* Login handled by form submit inside LoginForm */}

                    {/* Divider */}
                    <View className="flex-row items-center mb-6">
                        <View
                            className={`flex-1 h-px ${isDark ? 'bg-dark-border' : 'bg-light-border'
                                }`}
                        />
                        <Text
                            className={`mx-4 ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                                }`}
                        >
                            {DIVIDER.OR}
                        </Text>
                        <View
                            className={`flex-1 h-px ${isDark ? 'bg-dark-border' : 'bg-light-border'
                                }`}
                        />
                    </View>

                    {/* Google Button */}
                    <View className="mb-4">
                        <Button variant="ghost" icon={ICONS.GOOGLE} onPress={handleGoogleLogin}>
                            {t('auth.googleButton')}
                        </Button>
                    </View>

                    {/* Guest Button */}
                    <Button variant="ghost" onPress={handleGuestLogin}>
                        {t('auth.guestButton')}
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
