import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { selectProducts } from '../store/productsSelectors';
import { loadMockProducts } from '../store/productsSlice';
import { toggleTheme } from '../../../shared/theme/themeSlice';
import { Card } from '../../../shared/components/Card';

export const ProductListScreen = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const theme = useAppSelector((state) => state.theme.mode);
    const user = useAppSelector((state) => state.auth.user);
    const isDark = theme === 'dark';

    useEffect(() => {
        // Load mock products on mount
        dispatch(loadMockProducts());
        console.log(user)
    }, [dispatch]);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <View className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
            {/* Header */}
            <View
                className={`px-6 pt-16 pb-6 border-b ${isDark
                        ? 'bg-dark-surface border-dark-border'
                        : 'bg-white border-light-border'
                    }`}
            >
                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Text
                            className={`text-3xl font-bold ${isDark ? 'text-dark-text' : 'text-light-text'
                                }`}
                        >
                            {t('products.title')}
                        </Text>
                        {user && (
                            <Text
                                className={`text-sm mt-1 ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                                    }`}
                            >
                                {user.name || user.email}
                            </Text>
                        )}
                    </View>

                    <View className="flex-row space-x-2">
                    
                        {/* Language Toggle */}
                        <TouchableOpacity
                            onPress={toggleLanguage}
                            className={`px-3 py-2 rounded-lg ${isDark ? 'bg-dark-bg' : 'bg-light-surface'
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
                            className={`px-3 py-2 rounded-lg ${isDark ? 'bg-dark-bg' : 'bg-light-surface'
                                }`}
                            activeOpacity={0.7}
                        >
                            <Text className="text-lg">{isDark ? '🌙' : '☀️'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Product List */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Card item={item} />}
                contentContainerClassName="px-6 py-6"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center py-20">
                        <Text
                            className={`text-lg ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                                }`}
                        >
                            {t('products.noProducts')}
                        </Text>
                    </View>
                }
            />
        </View>
    );
};
