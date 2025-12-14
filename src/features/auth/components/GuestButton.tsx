import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../shared/store/hooks';

interface GuestButtonProps {
    onPress: () => void;
}

export const GuestButton: React.FC<GuestButtonProps> = ({ onPress }) => {
    const { t } = useTranslation();
    const theme = useAppSelector((state) => state.theme.mode);
    const isDark = theme === 'dark';

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full py-4 rounded-lg ${isDark ? 'bg-dark-surface' : 'bg-light-surface'
                }`}
            activeOpacity={0.7}
        >
            <Text
                className={`text-center text-base font-medium ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                    }`}
            >
                {t('auth.guestButton')}
            </Text>
        </TouchableOpacity>
    );
};
