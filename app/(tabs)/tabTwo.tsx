import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, DataTable } from "react-native-paper";
import {
  marketTableHeaderInEnglish,
  marketTableHeaderInTamil,
  tnDistrictsInEnglish,
  tnDistrictsInTamil,
  vegetableNamesInEnglish,
  vegetableNamesInTamil,
} from "@/constants";
import { parseItems } from "@/constants/utils";
import { useLocale } from "@/components/context/app-context";
import { fonts } from "@/constants/fonts";
import { Item } from "@/constants/types";
import { MarketTableSkeleton } from "@/components/Market/market-skeleton";

interface User {
  userDistrict: string;
}

interface MarketHomeProps {
  user: User;
}

const MarketHome2: React.FC<MarketHomeProps> = ({ user }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<string | undefined>("Chennai");

  const scrollViewRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://agrovoiceai.vercel.app/en/api/scrape",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location: location }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setItems(parseItems(data.scrapedData));
        } else {
          setError("Failed to fetch prices.");
        }
      } catch (error) {
        setError("Failed to fetch prices. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <MarketTableSkeleton />;
  }

  const { locale, setLocale } = useLocale();

  if (error) {
    return (
      <View className="flex items-center justify-center h-[95vh] md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <View className="md:p-10 p-6 w-full bg-red-600  border border-zinc-900/80 text-lg rounded-2xl">
          <View className="md:text-2xl text-center text-lg text-red-600 flex justify-center font-pops">
            {locale === "en" ? (
              <Text className="text-white">
                Data might not be available for your location.
              </Text>
            ) : (
              <Text className="text-white">
                உங்கள் இருப்பிடத்திற்கான தரவு கிடைக்கவில்லை.
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }

  if (!items || !items.length) {
    return (
      <View className="flex items-center justify-center h-[95vh] md:w-[60%] md:p-0 p-6 -mt-40 mx-auto">
        <View className="md:p-10 p-6 w-full bg-red-600 dark:bg-gray-950 border border-green-600/60 dark:border-green-800/60 text-lg text-white rounded-2xl">
          <Text className=" text-center text-white text-lg flex justify-center font-pops">
            {locale === "en"
              ? "No prices data available. But you can check for other locations."
              : "விலை தரவு கிடைக்கவில்லை. ஆனால் மற்ற இருப்பிடங்களைச் பார்க்கலாம்."}
          </Text>
          {/* <View className="flex justify-center">
            <MarketLocationNotAvailable
              user={user}
              setItems={setItems}
              setLocation={setLocation as Dispatch<SetStateAction<string>>}
            />
          </View> */}
        </View>
      </View>
    );
  }
  const scrollToBottom = (scrollViewRef: any) => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const district = (
    locale === "en" ? tnDistrictsInEnglish : tnDistrictsInTamil
  )[location as keyof typeof tnDistrictsInEnglish] as string;

  return (
    <View style={{ alignItems: "center", paddingBottom: 10 }}>
      <View style={{ width: "100%", padding: 10 }}>
        <View className={"text-6xl text-center justify-center items-center"}>
          {locale === "en" ? (
            <Text
              className="text-3xl text-green-500 py-3"
              style={fonts.poppinsSemiBold}
            >
              Today's Price in {district}
            </Text>
          ) : (
            <Text>{district} சந்தை விலைகள்</Text>
          )}
        </View>
        <View className="flex flex-row justify-between items-center md:ml-1 ml-2 mb-6 text-lg px-1">
          <Text className="flex text-md justify-center mt-1">
            {new Date().toLocaleDateString(
              `${locale === "en" ? "en-IN" : "ta-IN"}`,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </Text>

          {/* <Button
            className="flex justify-start -mt-1 text-lg "
            onPress={() => scrollToBottom(scrollViewRef)}
          >
            <Text className="" style={{ fontSize: 16 }}>
              {locale === "en" ? "View other locations" : "பிற இடங்களைக் காண"}
            </Text>
          </Button> */}
        </View>
        <ScrollView horizontal={false}>
          <DataTable className="rounded-lg">
            <DataTable.Header>
              {(locale === "en"
                ? marketTableHeaderInEnglish
                : marketTableHeaderInTamil
              ).map((item, index) => (
                <DataTable.Title key={index}>{item.label}</DataTable.Title>
              ))}
            </DataTable.Header>
            {items.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>
                  {locale === "en"
                    ? vegetableNamesInEnglish[
                        item.name as keyof typeof vegetableNamesInEnglish
                      ]
                    : vegetableNamesInTamil[
                        item.name as keyof typeof vegetableNamesInTamil
                      ]}
                </DataTable.Cell>
                <DataTable.Cell>Kg / Pcs</DataTable.Cell>
                <DataTable.Cell>{item.marketPrice.substring(2)}</DataTable.Cell>
                <DataTable.Cell>{item.retailPrice.substring(2)}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
};

export default MarketHome2;
