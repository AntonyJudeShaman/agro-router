import { View } from "react-native";

export const LoadingDots = ({
  className,
}: {
  color?: string;
  className: string;
}) => {
  return (
    <View className="loading space-x-2">
      <View className={className} />
      <View className={className} />
      <View className={className} />
    </View>
  );
};
