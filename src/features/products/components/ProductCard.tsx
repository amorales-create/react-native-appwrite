import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../../shared/store/hooks';
import { Product } from '../../../shared/types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const theme = useAppSelector((state) => state.theme.mode);
    const isDark = theme === 'dark';

    return (
        <View
            className={`rounded-xl p-4 mb-4 border ${isDark
                    ? 'bg-dark-surface border-dark-border'
                    : 'bg-white border-light-border'
                }`}
        >
            <View className="flex-row items-center mb-3">
                <Text className="text-5xl mr-4">{product.image}</Text>
                <View className="flex-1">
                    <Text
                        className={`text-lg font-bold mb-1 ${isDark ? 'text-dark-text' : 'text-light-text'
                            }`}
                    >
                        {product.name}
                    </Text>
                    <Text
                        className={`text-sm ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                            }`}
                    >
                        {product.category}
                    </Text>
                </View>
            </View>

            <Text
                className={`text-sm mb-3 ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                    }`}
            >
                {product.description}
            </Text>

            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-light-primary">
                    ${product.price.toFixed(2)}
                </Text>
                <View
                    className={`px-4 py-2 rounded-lg ${isDark ? 'bg-dark-bg' : 'bg-light-surface'
                        }`}
                >
                    <Text
                        className={`text-xs font-medium ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                            }`}
                    >
                        {product.category}
                    </Text>
                </View>
            </View>
        </View>
    );
};
