import { useSession } from "@/components/context/app-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { TouchableOpacity, Linking } from "react-native";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { session, updateSession } = useSession();

  const handleSignIn = async () => {
    try {
      await AsyncStorage.setItem("token7", "hello123");

      const response = await fetch(
        "https://agrovoiceai.vercel.app/api/user/name"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { id } = await response.json();
      updateSession({
        userId: id,
        token: (await AsyncStorage.getItem("token7")) || "",
        isLoggedIn: true,
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Error signing in. Please try again later.");
    }
  };

  const OpenURLButton = ({ url, children }: any) => {
    const handlePress = async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Don't know how to open this URL: ", url);
      }
    };

    return (
      <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>
    );
  };

  return (
    <>
      {!session?.userId && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              width: 250,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 10,
            }}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              width: 250,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 10,
            }}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Sign In" onPress={handleSignIn} />
          {errorMessage ? (
            <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
          ) : null}
          <OpenURLButton url="https://agrovoiceai.vercel.app/api/user/id">
            <Text>
              Open in browser
              {session?.userId ? `: ${session.userId}` : "null"}
            </Text>
          </OpenURLButton>
        </View>
      )}
    </>
  );
};

export default SignInPage;
