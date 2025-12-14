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
import { toggleTheme } from '../../../shared/theme/themeSlice';
import { LoginForm } from '../components/LoginForm';
import { GoogleButton } from '../components/GoogleButton';
import { GuestButton } from '../components/GuestButton';

export const AuthScreen = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.mode);
    const isDark = theme === 'dark';

    const handleEmailLogin = (data: { email: string; password: string }) => {
        // For now, just simulate login (no actual authentication)
        dispatch(
            loginSuccess({
                id: '1',
                email: data.email,
                name: data.email.split('@')[0],
                type: 'email',
            })
        );
    };

    const handleGoogleLogin = () => {
        // Visual only - no functionality yet
        console.log('Google login pressed');
    };

    const handleGuestLogin = () => {
        dispatch(
            loginSuccess({
                id: 'guest',
                name: 'Guest User',
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
                            <Text className="text-xl">{isDark ? '🌙' : '☀️'}</Text>
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
                        <LoginForm onSubmit={handleEmailLogin} />
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={() => {
                            // This will be handled by the form
                        }}
                        className="w-full py-4 rounded-lg bg-light-primary active:bg-light-primaryDark mb-6"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-center text-base font-bold">
                            {t('auth.loginButton')}
                        </Text>
                    </TouchableOpacity>

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
                            o
                        </Text>
                        <View
                            className={`flex-1 h-px ${isDark ? 'bg-dark-border' : 'bg-light-border'
                                }`}
                        />
                    </View>

                    {/* Google Button */}
                    <View className="mb-4">
                        <GoogleButton onPress={handleGoogleLogin} />
                    </View>

                    {/* Guest Button */}
                    <GuestButton onPress={handleGuestLogin} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
