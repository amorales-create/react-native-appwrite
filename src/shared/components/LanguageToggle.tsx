import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const theme = useAppSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };
  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      className={`px-4 py-2 rounded-lg ${
        isDark ? "bg-dark-surface" : "bg-light-surface"
      }`}
      activeOpacity={0.7}
    >
      <Text
        className={`text-sm font-medium ${
          isDark ? "text-dark-text" : "text-light-text"
        }`}
      >
        {i18n.language.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default LanguageToggle;
