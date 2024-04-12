import React, { useEffect, useState } from "react";
import { Button, Pressable, View, Text } from "react-native";
import { Link, Tabs } from "expo-router";
import {
  FontAwesome5,
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useLocale, useSession } from "@/components/context/app-context";
import SignInPage from "../signin";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { locale, setLocale } = useLocale();
  const { session, updateSession } = useSession();

  const handleChangeLocale = () => {
    setLocale(locale === "en" ? "ta" : "en");
  };

  return (
    <>
      {!session?.userId ? (
        <SignInPage />
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: useClientOnlyValue(false, true),
          }}
        >
          <Tabs.Screen
            name="tabOne"
            options={{
              title: "Chat",
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="robot" size={22} color={color} />
              ),
              headerTitle: "AgroVoiceAI",
              headerTitleAlign: "center",
              headerLeft: () => (
                <>
                  {locale !== "en" ? (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">English</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex flex-row items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">தமிழ்</Text>
                    </Pressable>
                  )}
                </>
              ),
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Ionicons
                        name="settings"
                        size={20}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />{" "}
          <Tabs.Screen redirect name="index" />
          <Tabs.Screen
            name="tabTwo"
            options={{
              title: "Weather",
              tabBarIcon: ({ color }) => (
                <Entypo name="cloud" size={26} color={color} />
              ),
              headerTitle: "AgroVoiceAI",
              headerTitleAlign: "center",
              headerLeft: () => (
                <>
                  {locale !== "en" ? (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">English</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex flex-row items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">தமிழ்</Text>
                    </Pressable>
                  )}
                </>
              ),
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Ionicons
                        name="settings"
                        size={20}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Tabs.Screen
            name="tabThree"
            options={{
              title: "Market",
              tabBarIcon: ({ color }) => (
                <Entypo name="shop" size={24} color={color} />
              ),
              headerTitle: "AgroVoiceAI",
              headerTitleAlign: "center",
              headerLeft: () => (
                <>
                  {locale !== "en" ? (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">English</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex flex-row items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">தமிழ்</Text>
                    </Pressable>
                  )}
                </>
              ),
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Ionicons
                        name="settings"
                        size={20}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Tabs.Screen
            name="tabFour"
            options={{
              title: "Pest",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="pest-control" size={28} color={color} />
              ),
              headerTitle: "AgroVoiceAI",
              headerTitleAlign: "center",
              headerLeft: () => (
                <>
                  {locale !== "en" ? (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">English</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      className="ml-2 bg-green-600 rounded-md h-1/2 w-1/2 flex flex-row items-center justify-center"
                      onPress={handleChangeLocale}
                    >
                      <Text className="text-white pb-[1px]">தமிழ்</Text>
                    </Pressable>
                  )}
                </>
              ),
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Ionicons
                        name="settings"
                        size={20}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
        </Tabs>
      )}
    </>
  );
}
