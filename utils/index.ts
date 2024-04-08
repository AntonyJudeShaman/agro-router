import AsyncStorage from "@react-native-async-storage/async-storage";

const getLocale = async () => {
  try {
    const savedLocale = await AsyncStorage.getItem("locale");
    return savedLocale;
  } catch (error) {
    console.error("Error retrieving locale from AsyncStorage:", error);
    return null;
  }
};

export default getLocale;

export const saveLocale = async (newLocale: any, setLocale: any) => {
  try {
    await AsyncStorage.setItem("locale", newLocale);
    setLocale(newLocale);
  } catch (error) {
    console.error("Error saving locale to AsyncStorage:", error);
  }
};
