import React from "react";
import { View, Text } from "react-native";

export default function WeatherSkeleton() {
  return (
    <View>
      <View className="flex flex-col items-center justify-center mt-8 pb-10 space-y-4">
        <View className="animate-pulse border border-gray-400 dark:border-gray-600 bg-gray-300 dark:bg-gray-800 rounded-xl" />
        <View className="w-3/4">
          <View className="animate-pulse mx-auto mb-4 w-4/6 h-8 bg-gray-300 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-600" />

          <View className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            <View className="animate-pulse mt-4 w-full h-52 bg-gray-300 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-600" />
            <View className="animate-pulse mt-4 w-full h-52 bg-gray-300 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-600" />
            <View className="animate-pulse mt-4 w-full h-52 bg-gray-300 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-600" />
            <View className="animate-pulse mt-4 w-full h-52 bg-gray-300 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-600" />
          </View>
        </View>
      </View>
    </View>
  );
}
