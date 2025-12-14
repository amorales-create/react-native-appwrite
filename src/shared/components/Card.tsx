import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from '../store/hooks';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const isDark = theme === 'dark';

  return (
    <View className={`rounded-xl p-4 mb-4 border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border'} ${className}`}>
      {children}
    </View>
  );
};

export default Card;
