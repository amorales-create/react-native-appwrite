import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import { selectProducts } from "../store/productsSelectors";
import { loadMockProducts } from "../store/productsSlice";
import { Card } from "../../../shared/components/Card";



export const ProductListScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const theme = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.auth.user);
  const isDark = theme === "dark";

  useEffect(() => {
    // Load mock products on mount
    dispatch(loadMockProducts());
    console.log(user);
  }, [dispatch]);


  return (
    <View className={`flex-1 ${isDark ? "bg-dark-bg" : "bg-light-bg"}`}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerClassName="px-6 py-6"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text
              className={`text-lg ${
                isDark ? "text-dark-textSecondary" : "text-light-textSecondary"
              }`}
            >
              {t("products.noProducts")}
            </Text>
          </View>
        }
      />
    </View>
  );
};

