import { ForecastItem } from "@/types/weather";

export const fetchForecast = async (city: string): Promise<ForecastItem[]> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch forecast");
  const data = await res.json();
  return data.list;
};
