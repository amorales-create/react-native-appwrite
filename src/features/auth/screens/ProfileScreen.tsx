import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import { selectUser } from "../store/authSelectors";
import Avatar from "../../../shared/components/Avatar";
import { logoutUser } from "../store/authThunks";
import { useTranslation } from "react-i18next";
import Button from "src/shared/components/Button";
import { LoginForm } from "../components/LoginForm";
import { AuthScreen } from "./AuthScreen";

const ProfileScreen = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-start px-6 pt-16 bg-light-bg dark:bg-dark-bg">
      <Avatar email={user?.email} />

      <Text className="text-xl font-bold mt-6">{user?.name ?? "—"}</Text>
      <Text className="text-sm text-gray-500 mt-1">{user?.email ?? "—"}</Text>
      <Text className="text-sm text-gray-500 mt-1">{`Type: ${
        user?.type ?? "—"
      }`}</Text>
      
      {user?.type === "guest" ? (
        <AuthScreen redirect={false} />
      ) : (
        <Button onPress={() => dispatch(logoutUser())} variant="primary">
          {t("products.logout")}
        </Button>
      )}
    </View>
  );
};

export default ProfileScreen;
