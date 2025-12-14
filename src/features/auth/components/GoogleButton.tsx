import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../shared/store/hooks';

interface GoogleButtonProps {
    onPress: () => void;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress }) => {
    const { t } = useTranslation();
    const theme = useAppSelector((state) => state.theme.mode);
    const isDark = theme === 'dark';

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full py-4 rounded-lg border-2 flex-row items-center justify-center ${isDark
                    ? 'bg-dark-surface border-dark-border'
                    : 'bg-white border-light-border'
                }`}
            activeOpacity={0.7}
        >
            <Text className="text-2xl mr-3">🔍</Text>
            <Text
                className={`text-base font-semibold ${isDark ? 'text-dark-text' : 'text-light-text'
                    }`}
            >
                {t('auth.googleButton')}
            </Text>
        </TouchableOpacity>
    );
};
