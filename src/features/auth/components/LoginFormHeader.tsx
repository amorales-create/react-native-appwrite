import React from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "src/shared/store/hooks";
import ThemeToggle from "src/shared/components/ThemeToggle";
import LanguageToggle from "src/shared/components/LanguageToggle";

interface LoginFormHeaderProps {
  showThemeToggle?: boolean;
  showLanguageToggle?: boolean;
  title?: string;
  subtitle?: string;
}

export const LoginFormHeader: React.FC<LoginFormHeaderProps> = ({
  showLanguageToggle = true,
  showThemeToggle = true,
  title = "",
  subtitle = "",
}) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  return (
    <View>
      <View className="flex-row justify-end mb-8 space-x-3">
        {showLanguageToggle && <LanguageToggle />}

        {showThemeToggle && <ThemeToggle />}
      </View>

      <View className="mb-12">
        {title && (
          <Text
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            className={`text-lg ${
              isDark ? "text-dark-textSecondary" : "text-light-textSecondary"
            }`}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default LoginFormHeader;
