import React from "react";
import { Text, View } from "react-native";
import ShapeCurvedBottom from "../svg/ShapeCurvedBottom";

export type HeroProps = {
  withImage: boolean;
};

export const Hero: React.FC<HeroProps> = ({ withImage = false }) => {
  return (
    <View className="h-1/3 w-full">
      <View className="relative">
        <ShapeCurvedBottom fill='#FF6B35' />
      </View>
      <Text className="absolute text-2xl text font-bold mb-4">Hola</Text>
    </View>
  );
};