import { WeatherData } from "@/types/weather";

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&amp;appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&amp;units=metric`
  );
  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json()
  console.log("kjjbdkjasdna",data)
  return res.json();
};
