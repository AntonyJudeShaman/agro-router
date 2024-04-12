import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const MarketTableSkeleton = () => {
  return (
    <View style={{}} className="m-5">
      <View className="w-full bg-gray-400/60 rounded-lg mb-6 h-10" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <View
          style={{
            width: 80,
            height: 30,
            borderRadius: 4,
          }}
          className="bg-gray-400/60 rounded-lg"
        />
        <View
          style={{
            width: 80,
            height: 30,
            borderRadius: 4,
          }}
          className="bg-gray-400/60 rounded-lg"
        />
        <View
          style={{
            width: 80,
            height: 30,
            borderRadius: 4,
          }}
          className="bg-gray-400/60 rounded-lg"
        />
        <View
          style={{
            width: 80,
            height: 30,
            borderRadius: 4,
          }}
          className="bg-gray-400/60 rounded-lg"
        />
      </View>

      {/* Skeleton layout for table rows */}
      {[...Array(20)].map((_, index) => (
        <View
          key={index}
          style={{}}
          className=" flex flex-row justify-between items-center mt-4"
        >
          <View
            style={{
              width: 80,
              height: 22,
              borderRadius: 4,
            }}
            className="bg-gray-400/60 rounded-lg"
          />
          <View
            style={{
              width: 80,
              height: 22,
              borderRadius: 4,
            }}
            className="bg-gray-400/60 rounded-lg"
          />
          <View
            style={{
              width: 80,
              height: 22,
              borderRadius: 4,
            }}
            className="bg-gray-400/60 rounded-lg"
          />
          <View
            style={{
              width: 80,
              height: 22,
              borderRadius: 4,
            }}
            className="bg-gray-400/60 rounded-lg"
          />
        </View>
      ))}
    </View>
  );
};
