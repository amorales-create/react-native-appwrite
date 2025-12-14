import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../shared/store/hooks';
import { Button } from '../../../shared/components/Button';

interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) => void;
    onSignup?: (data: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSignup }) => {
    const { t } = useTranslation();
    const theme = useAppSelector((state) => state.theme.mode);
    const isDark = theme === 'dark';

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <View className="w-full space-y-4">
            {/* Email Input */}
            <View>
                <Text
                    className={`text-sm font-medium mb-2 ${isDark ? 'text-dark-text' : 'text-light-text'
                        }`}
                >
                    {t('auth.email')}
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: t('auth.emailRequired'),
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('auth.emailInvalid'),
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className={`w-full px-4 py-3 rounded-lg border ${isDark
                                    ? 'bg-dark-surface border-dark-border text-dark-text'
                                    : 'bg-white border-light-border text-light-text'
                                }`}
                            placeholder={t('auth.emailPlaceholder')}
                            placeholderTextColor={isDark ? '#94A3B8' : '#6B7280'}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                    name="email"
                />
                {errors.email && (
                    <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
                )}
            </View>

            {/* Password Input */}
            <View>
                <Text
                    className={`text-sm font-medium mb-2 ${isDark ? 'text-dark-text' : 'text-light-text'
                        }`}
                >
                    {t('auth.password')}
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: t('auth.passwordRequired'),
                        minLength: {
                            value: 6,
                            message: t('auth.passwordMin'),
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className={`w-full px-4 py-3 rounded-lg border ${isDark
                                    ? 'bg-dark-surface border-dark-border text-dark-text'
                                    : 'bg-white border-light-border text-light-text'
                                }`}
                            placeholder={t('auth.passwordPlaceholder')}
                            placeholderTextColor={isDark ? '#94A3B8' : '#6B7280'}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />
                {errors.password && (
                    <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
                )}
            </View>
            {/* Submit Button */}
            <View>
                <Button variant="primary" onPress={handleSubmit(onSubmit)}>
                    {t('auth.loginButton')}
                </Button>
            </View>

            {/* Signup Button (optional) */}
            {onSignup && (
                <View>
                    <Button variant="ghost" onPress={handleSubmit((data) => onSignup && onSignup(data))}>
                        {t('auth.signupButton')}
                    </Button>
                </View>
            )}
        </View>
    );
};
