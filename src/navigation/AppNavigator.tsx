import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../shared/store/hooks";
import { selectIsAuthenticated } from "../features/auth/store/authSelectors";
import { AuthScreen } from "../features/auth/screens/AuthScreen";
import ProductNavigation from "./ProductNavigation";
import { View } from "react-native";

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
        <View className="pt-16 flex-1 w-full">
          <AuthScreen />
        </View>
      ) : (
        <ProductNavigation />
      )}
    </NavigationContainer>
  );
};
