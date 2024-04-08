import { Text, View, StyleSheet, Button } from "react-native";
import { fonts } from "@/constants/fonts";
import { en, ta } from "@/localizations";
import { useEffect, useState } from "react";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocale } from "./context/locale-context";

export default function TabOne() {
  const { locale, setLocale } = useLocale();
  i18n.fallbacks = true;
  i18n.translations = { en, ta };
  i18n.locale = locale;

  useEffect(() => {
    const getLocale = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem("locale");
        if (savedLocale !== null) {
          setLocale(savedLocale);
        }
      } catch (error) {
        console.error("Error retrieving locale from AsyncStorage:", error);
      }
    };

    getLocale();
  }, []);

  return (
    <View className="flex bg-white h-full justify-center items-center">
      <Text
        className="text-6xl text-green-500 p-4"
        style={fonts.poppinsSemiBold}
      >
        AgroVoiceAI
        {i18n.t("hello")}
        {locale}
      </Text>
      <Text
        className="max-w-1/2 text-sm text-gray-600 text-center"
        style={fonts.poppinsRegular}
      >
        Meet AgroVoiceAI: Your virtual agronomy expert, revolutionizing farming
        with AI-driven insights and personalized guidance, ensuring every crop
        conversation yields success.
      </Text>
    </View>
  );
}
