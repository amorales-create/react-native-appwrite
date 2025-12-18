import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../shared/store/hooks';
import { selectProducts } from '../../products/store/productsSelectors';
import { selectUser } from '../../auth/store/authSelectors';

const HomeScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const products = useAppSelector(selectProducts);
    const user = useAppSelector(selectUser);

    return (
        <View className="flex-1 px-6 py-10 bg-light-bg dark:bg-dark-bg">
            <Text className="text-2xl font-bold mb-4">{t('home.welcome', { name: user?.name ?? user?.email ?? 'User' })}</Text>

            <View className="mb-6">
                <Text className="text-lg">{t('home.summary')}</Text>
                <Text className="text-sm text-gray-500 mt-2">{t('home.totalProducts', { count: products.length ?? 0 })}</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Products')}
                className="py-3 px-4 rounded-lg bg-light-primary"
            >
                <Text className="text-white">{t('home.viewProducts')}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
