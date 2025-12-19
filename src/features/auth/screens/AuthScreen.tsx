import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
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
import { DEFAULTS, AUTH } from "../../../shared/constants/ui";
import LoginFormHeader from "../components/LoginFormHeader";

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

  React.useEffect(() => {
    if (isAuthenticated && redirect) {
      navigation.replace("Products");
    }
  }, [isAuthenticated, navigation, redirect]);

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
          <LoginFormHeader
            showThemeToggle={showThemeToggle}
            showLanguageToggle={showLanguageToggle}
          />
         
          <View className="mb-6">
            <LoginForm
              onSubmit={handleEmailLogin}
              onSignup={(data) =>
                dispatch(registerUser(data.email, data.password))
              }
              handleGoogleLogin={handleGoogleLogin}
              handleGuestLogin={handleGuestLogin}
              isSubmitting={authLoading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
