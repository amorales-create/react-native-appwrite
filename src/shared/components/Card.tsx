import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { Product } from '../types';
import { CURRENCY } from '../constants/ui';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Optional item to render a product-like card directly from `Card`.
   * If provided, `Card` will render a product layout similar to the old ProductCard.
   */
  item?: Product;
}

export const Card: React.FC<CardProps> = ({ children, className = '', item }) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const isDark = theme === 'dark';

  const baseClasses = `rounded-xl p-4 mb-4 border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border'} ${className}`;

  if (item) {
    return (
      <View className={baseClasses}>
        <View className="flex-row items-center mb-3">
          <Text className="text-5xl mr-4">{item.image}</Text>
          <View className="flex-1">
            <Text className="text-lg font-bold mb-1">{item.name}</Text>
            <Text className="text-sm text-light-textSecondary">{item.category}</Text>
          </View>
        </View>

        {item.description ? <Text className="text-sm mb-3 text-light-textSecondary">{item.description}</Text> : null}

        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-light-primary">{CURRENCY.SYMBOL}{item.price?.toFixed(2)}</Text>
          <View className="px-4 py-2 rounded-lg bg-light-surface">
            <Text className="text-xs font-medium text-light-textSecondary">{item.category}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className={baseClasses}>
      {children}
    </View>
  );
};

export default Card;
