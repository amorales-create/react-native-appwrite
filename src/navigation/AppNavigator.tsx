import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../shared/store/hooks";
import { selectIsAuthenticated } from "../features/auth/store/authSelectors";
import { AuthScreen } from "../features/auth/screens/AuthScreen";
import ProductNavigation from "./ProductNavigation";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

export type RootStackParamList = {
  Auth: undefined;
  Products: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
 const { t } = useTranslation();
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <View className="pt-16 flex-1 w-full">
          <AuthScreen formTitle={t("auth.title")} formSubtitle={t("auth.subtitle")}/>
        </View>
      ) : (
        <ProductNavigation />
      )}
    </NavigationContainer>
  );
};
