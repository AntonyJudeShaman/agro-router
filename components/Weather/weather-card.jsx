import React from "react";
import { View, Text } from "react-native";
import {
  weatherDescriptionInEnglish,
  weatherDescriptionInTamil,
  weatherMainInEnglish,
  weatherMainInTamil,
} from "@/constants";
import { formatTime12hr } from "@/constants/utils";
import {
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Cloud,
  Haze,
  Droplet,
  ThermometerSun,
  SunSnow,
  Droplets,
  Wind,
  GaugeCircle,
} from "lucide-react-native";
import { useLocale } from "@/components/context/app-context";
import { fonts } from "@/constants/fonts";

function getWeatherGradientClass(weatherMain) {
  switch (weatherMain) {
    case "Clear":
      return "bg-blue-700";
    case "Rain":
      return "bg-green-700";
    case "Thunderstorm":
      return "bg-gray-700";
    case "Snow":
      return "bg-gray-400";
    case "Haze":
      return "bg-yellow-700";
    case "Mist":
      return "bg-purple-800";
    default:
      return "bg-black";
  }
}

function WeatherForecastCard({ forecast, forecastIndex }) {
  const { locale, setLocale } = useLocale();
  return (
    <View
      className={`rounded-2xl w-4/5 mt-8 m-4 flex mx-auto bg-white duration-500  border hover:border-green-200 border-gray-400  shadow-lg lg:p-4 p-3 
      ${getWeatherGradientClass(forecast.weather[0].main)}`}
      key={forecastIndex}
    >
      <View className="gap-8 p-4">
        <View>
          <Text className="text-sm text-white">
            {formatTime12hr(forecast.dt_txt.substring(11, 16))}
          </Text>
          <View className="flex items-start">
            <Text className="mr-4">
              {forecast.weather[0].main === "Clear" && (
                <Sun fill="yellow" size={48} />
              )}
              {forecast.weather[0].main === "Rain" && (
                <CloudRain fill="green" size={48} />
              )}
              {forecast.weather[0].main === "Thunderstorm" && (
                <CloudLightning fill="yellow" size={48} />
              )}
              {forecast.weather[0].main === "Snow" && (
                <CloudSnow fill="black" size={48} />
              )}
              {forecast.weather[0].main === "Clouds" && (
                <Cloud fill="blue" size={48} />
              )}
              {forecast.weather[0].main === "Mist" && (
                <Droplet fill="gray" size={48} />
              )}
              {forecast.weather[0].main === "Haze" && (
                <Haze fill="orange" size={48} />
              )}
            </Text>
            <Text className="flex flex-col pt-2 text-white">
              <Text className="text-3xl" style={fonts.poppinsBold}>
                {locale === "en"
                  ? weatherMainInEnglish[forecast.weather[0].main]
                  : weatherMainInTamil[forecast.weather[0].main]}
              </Text>{" "}
            </Text>
            <Text className="text-sm pl-1 pt-1 text-white">
              {locale === "en"
                ? weatherDescriptionInEnglish[forecast.weather[0].description]
                : weatherDescriptionInTamil[forecast.weather[0].description]}
            </Text>
          </View>
        </View>
        <View>
          <View className="flex justify-center ites-center space-y-2">
            <Text className="text-lg text-white">
              <ThermometerSun size={24} color="white" />{" "}
              {locale === "en" ? "Temperature: " : "வெப்பநிலை: "}
              {Math.round(forecast.main.temp - 273.15)}°C
            </Text>
            <Text className="text-lg text-white">
              <SunSnow size={24} color="white" />{" "}
              {locale === "en" ? "Feels like: " : "உணர்வு: "}
              {Math.round(forecast.main.feels_like - 273.15)}°C
            </Text>
            <Text className="text-lg text-white">
              <Droplets size={24} color="white" />{" "}
              {locale === "en" ? "Humidity: " : "ஈரத்தன்மை: "}
              {forecast.main.humidity}%
            </Text>
            <Text className="text-lg text-white">
              <Wind size={24} color="white" />{" "}
              {locale === "en" ? "Wind Speed: " : "காற்று வேகம்: "}
              {forecast.wind.speed.toFixed(1)} m/s
            </Text>
            <Text className="text-lg text-white">
              <GaugeCircle size={24} color="white" />{" "}
              {locale === "en" ? "Pressure: " : "அழுத்தம்: "}
              {forecast.main.pressure} hPa
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default WeatherForecastCard;
