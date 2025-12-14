import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useAppSelector } from '../../shared/store/hooks';

type Variant = 'primary' | 'ghost';

interface ButtonProps {
  onPress: () => void;
  variant?: Variant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onPress, variant = 'ghost', icon, children, className = '', disabled = false }) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const isDark = theme === 'dark';

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        activeOpacity={disabled ? 1 : 0.8}
        className={`w-full py-3 rounded-lg bg-light-primary ${disabled ? 'opacity-50' : ''} ${className}`}
      >
        <Text className="text-white text-center text-base font-bold">{children}</Text>
      </TouchableOpacity>
    );
  }

  // ghost
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      className={`w-full py-3 rounded-lg ${isDark ? 'bg-dark-surface' : 'bg-light-surface'} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <View className="flex-row items-center justify-center">
        {icon ? <Text className="mr-3">{icon}</Text> : null}
        <Text className={`text-center text-base font-medium ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'}`}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
