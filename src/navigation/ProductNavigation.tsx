import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home/screens/HomeScreen';
import { ProductListScreen } from '../features/products/screens/ProductListScreen';
import ProfileScreen from '../features/auth/screens/ProfileScreen';
import FinanceScreen from '../features/finance/screens/FinanceScreen';

export type ProductTabParamList = {
    Home: undefined;
    Products: undefined;
    Profile: undefined;
    Finances: undefined;
};

const Tab = createBottomTabNavigator<ProductTabParamList>();

const ProductNavigation = () => {
    return (
        <Tab.Navigator
            detachInactiveScreens={false}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    // Use simple emoji icons to avoid adding extra icon dependencies
                    let icon = '•';
                    if (route.name === 'Home') icon = '🏠';
                    if (route.name === 'Products') icon = '📦';
                    if (route.name === 'Profile') icon = '👤';
                    if (route.name === 'Finances') icon = '💰';

                    return <Text style={{ fontSize: 18 }}>{icon}</Text>;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Products" component={ProductListScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Finances" component={FinanceScreen} />
        </Tab.Navigator>
    );
};

export default ProductNavigation;
