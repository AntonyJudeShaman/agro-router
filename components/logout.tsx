import React from "react";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from "@/components/context/app-context";

const LogoutButton = () => {
  const { updateSession } = useSession();

  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem("token4");
      // Update the session context to reflect that the user is logged out
      updateSession(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
