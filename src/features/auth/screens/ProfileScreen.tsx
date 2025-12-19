import React from "react";
import { View, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import { selectUser } from "../store/authSelectors";
import Avatar from "../../../shared/components/Avatar";
import { logoutUser } from "../store/authThunks";
import { useTranslation } from "react-i18next";
import Button from "src/shared/components/Button";
import { AuthScreen } from "./AuthScreen";

const ProfileScreen = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <View className="flex-1 w-full bg-light-bg dark:bg-dark-bg">
      <View className="flex-1">
        {user?.type === "guest" ? (
          <AuthScreen
            redirect={false}
            showThemeToggle={false}
            showLanguageToggle={false}
          />
        ) : (
          <Button onPress={() => dispatch(logoutUser())} variant="primary">
            {t("products.logout")}
          </Button>
        )}
      </View>
      </View>
  );
};

export default ProfileScreen;
