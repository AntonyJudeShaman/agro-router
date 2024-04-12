import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import WeatherCard from "@/components/Weather/weather-card";
import WeatherSkeleton from "@/components/Weather/weather-skeleton";
import { fonts } from "@/constants/fonts";

export default function TabTwoScreen() {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Chennai");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://agrovoiceai.vercel.app/en/api/weather",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location: location }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const forecastData = await res.json();
        setForecastData(forecastData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <WeatherSkeleton />;
  }

  const today = new Date();
  const groupedData = {};
  forecastData.list.forEach((item) => {
    const date = item.dt_txt.substring(0, 10);
    const forecastDate = new Date(date);

    const daysDifference = Math.ceil(
      (forecastDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    if (daysDifference >= 0 && daysDifference < 4) {
      const formattedDate = `${("0" + forecastDate.getDate()).slice(-2)}-${(
        "0" +
        (forecastDate.getMonth() + 1)
      ).slice(-2)}-${forecastDate.getFullYear()}`;

      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = [];
      }
      groupedData[formattedDate].push(item);
    }
  });

  const todayDate = `${today.getDate().toString().padStart(2, "0")}-${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;

  // const district = (
  //   locale === "en" ? tnDistrictsInEnglish : tnDistrictsInTamil
  // )[location];

  if (error) {
    return (
      <View style="flex items-center justify-center h-[95vh] p-6">
        <View style="p-10 bg-gray-50 border border-red-600/80 text-lg text-red-600 flex justify-center items-center rounded-2xl">
          <Text style="text-center">
            Some error occurred. Please try again later.
          </Text>
        </View>
      </View>
    );
  }

  if (!forecastData || !forecastData.list) {
    return (
      <View style="flex items-center justify-center h-[95vh] p-6">
        <View style="p-10 bg-gray-50 border border-green-600/60 text-lg text-green-600 flex flex-col justify-center items-center rounded-2xl">
          <Text style="text-center pb-10">
            No forecast data available. But you can check for other locations.
          </Text>
          {/* <WeatherLocationNotAvailable
            user={user}
            setForecastData={setForecastData}
            setLocation={setLocation}
          /> */}
        </View>
      </View>
    );
  }
  return (
    <View style="flex mx-auto">
      <Text
        className="text-green-600 text-4xl mt-6 mx-auto"
        style={fonts.poppinsBold}
      >
        Weather Forecast
      </Text>
      <ScrollView className="flex" contentContainerStyle="center">
        {Object.keys(groupedData).map((date, index) => (
          <View key={index} className="flex">
            <Text
              className="w-full text-lg mx-auto flex justify-center items-center text-center"
              contentContainerStyle="center"
              style={fonts.poppinsMedium}
            >
              {date}
            </Text>
            <View className="flex justify-center">
              {groupedData[date].map((forecast, forecastIndex) => (
                <WeatherCard key={forecastIndex} forecast={forecast} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style="mt-12 mx-auto w-[82%] lg:w-[70%] flex justify-start flex-col text-center">
        <Text style="text-3xl tracking-tighter font-bold mb-4">
          View weather in other locations
        </Text>
        {/* <WeatherLocationNotAvailable
          user={user}
          setForecastData={setForecastData}
          setLocation={setLocation}
        /> */}
      </View>
    </View>
  );
}
