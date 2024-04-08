import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { fonts } from "@/constants/fonts";
import { main } from "@/constants/container";

export default function TabTwoScreen() {
  return (
    <View style={main.container}>
      <Text style={fonts.poppinsBold} className="text-4xl">
        Tab Two
      </Text>
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
