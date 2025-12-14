import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../shared/store/hooks';
import { selectIsAuthenticated } from '../features/auth/store/authSelectors';
import { AuthScreen } from '../features/auth/screens/AuthScreen';
import { ProductListScreen } from '../features/products/screens/ProductListScreen';

export type RootStackParamList = {
    Auth: undefined;
    Products: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    return (
        <NavigationContainer>
                {!isAuthenticated ? (
                    <AuthScreen />
                ) : (
                    <ProductListScreen />
                )}

        </NavigationContainer>
    );
};
