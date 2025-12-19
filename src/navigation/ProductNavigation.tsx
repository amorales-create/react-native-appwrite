import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../features/home/screens/HomeScreen";
import { ProductListScreen } from "../features/products/screens/ProductListScreen";
import ProfileScreen from "../features/auth/screens/ProfileScreen";
import FinanceScreen from "../features/finance/screens/FinanceScreen";
import { View } from "react-native";
import LanguageToggle from "src/shared/components/LanguageToggle";
import ThemeToggle from "src/shared/components/ThemeToggle";

export type ProductTabParamList = {
  Home: undefined;
  Products: undefined;
  Profile: undefined;
  Finances: undefined;
};

const Tab = createBottomTabNavigator<ProductTabParamList>();

const routeIcons: Record<keyof ProductTabParamList, string> = {
  Home: "🏠",
  Products: "📦",
  Profile: "👤",
  Finances: "💰",
};

const ProductNavigationHeader = (text:string) => {
  return (
    <View className="w-full h-16 mt-16 flex-row items-center justify-between px-6 border-b border-light-border dark:border-dark-border">
      <Text className="text-lg font-bold text-light-text dark:text-dark-text">
      {text}
      </Text>
      <View className="flex-row">
        <LanguageToggle />
        <ThemeToggle />
      </View>
    </View>
  );
};
const ProductNavigation = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let icon = routeIcons[route.name];
          return <Text style={{ fontSize: 18 }}>{icon}</Text>;
        },
        header(props) {
          return ProductNavigationHeader(props.route.name);
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
