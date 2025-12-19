import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import { loginSuccess } from "../store/authSlice";
import {
  loginUser,
  loginWithGoogleThunk,
  registerUser,
} from "../store/authThunks";
import { LoginForm } from "../components/LoginForm";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/AppNavigator";
import { Button } from "../../../shared/components/Button";
import { DEFAULTS, DIVIDER, ICONS, AUTH } from "../../../shared/constants/ui";
import ThemeToggle from "src/shared/components/ThemeToggle";
import LanguageToggle from "src/shared/components/LanguageToggle";

interface AuthScreenProps {
  redirect?: boolean;
  showThemeToggle?: boolean;
  showLanguageToggle?: boolean;
}
export const AuthScreen: React.FC<AuthScreenProps> = ({
  redirect = true,
  showThemeToggle = true,
  showLanguageToggle = true,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isDark = theme === "dark";
  const authLoading = useAppSelector((state) => state.auth.loading);
  const authError = useAppSelector((state) => state.auth.error);

  const handleEmailLogin = (data: { email: string; password: string }) => {
    dispatch(loginUser(data.email, data.password));
  };

  const handleGoogleLogin = () => {
    if (authLoading) return;
    dispatch(loginWithGoogleThunk());
  };

  const handleGuestLogin = () => {
    if (authLoading) return;
    dispatch(
      loginSuccess({
        id: AUTH.GUEST_ID,
        name: DEFAULTS.GUEST_NAME,
        type: "guest",
      })
    );
  };

  // Redirect to products when authenticated
  React.useEffect(() => {
    if (isAuthenticated && redirect) {
      navigation.replace("Products");
    }
  }, [isAuthenticated, navigation, redirect]);

  // Show errors as alerts
  React.useEffect(() => {
    if (authError) {
      Alert.alert("Authentication error", authError);
    }
  }, [authError]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className={`flex-1 ${isDark ? "bg-dark-bg" : "bg-light-bg"}`}
        contentContainerClassName="flex-grow"
      >
        <View className="px-6 pb-8">
          {/* Header with controls */}
          <View className="flex-row justify-end mb-8 space-x-3">
            {/* Language Toggle */}

            {showLanguageToggle && <LanguageToggle />}
            {/* Theme Toggle */}
            {showThemeToggle && <ThemeToggle />}
          </View>

          {/* Title */}
          <View className="mb-12">
            <Text
              className={`text-4xl font-bold mb-2 ${isDark ? "text-dark-text" : "text-light-text"
                }`}
            >
              {t("auth.title")}
            </Text>
            <Text
              className={`text-lg ${isDark ? "text-dark-textSecondary" : "text-light-textSecondary"
                }`}
            >
              {t("auth.subtitle")}
            </Text>
          </View>

          {/* Login Form */}
          <View className="mb-6">
            <LoginForm
              onSubmit={handleEmailLogin}
              onSignup={(data) =>
                dispatch(registerUser(data.email, data.password))
              }
              isSubmitting={authLoading}
            />
          </View>

          {/* Login handled by form submit inside LoginForm */}

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View
              className={`flex-1 h-px ${isDark ? "bg-dark-border" : "bg-light-border"
                }`}
            />
            <Text
              className={`mx-4 ${isDark ? "text-dark-textSecondary" : "text-light-textSecondary"
                }`}
            >
              {DIVIDER.OR}
            </Text>
            <View
              className={`flex-1 h-px ${isDark ? "bg-dark-border" : "bg-light-border"
                }`}
            />
          </View>

          {/* Google Button */}
          <View className="mb-4">
            <Button
              variant="ghost"
              icon={ICONS.GOOGLE}
              onPress={handleGoogleLogin}
              disabled={authLoading}
            >
              {t("auth.googleButton")}
            </Button>
          </View>

          {/* Guest Button */}
          <Button
            variant="ghost"
            onPress={handleGuestLogin}
            disabled={authLoading}
          >
            {t("auth.guestButton")}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
