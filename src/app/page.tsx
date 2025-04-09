"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherCard from "@/components/WeatherCard";
import RecentSearches from "@/components/RecentSearches";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type WeatherDataType = {
  city: string;
  curr_temp: string;
  weather_cond: string;
  humidity: string;
  wind_speed: string;
  icon: string;
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("weather-history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const updateHistory = (newCity: string) => {
    let updated = [newCity, ...history.filter((c) => c !== newCity)].slice(
      0,
      5
    );
    setHistory(updated);
    localStorage.setItem("weather-history", JSON.stringify(updated));
  };
  const { theme, toggleTheme } = useTheme();

  const handleFetchWeather = async (customCity?: string) => {
    const queryCity = customCity || city;
    if (!queryCity) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found. Please check the name.");
        return;
      }

      const formatted: WeatherDataType = {
        city: data.name,
        curr_temp: `${data.main.temp} °C`,
        weather_cond: data.weather[0].main,
        humidity: `${data.main.humidity} %`,
        wind_speed: `${data.wind.speed} km/h`,
        icon: data.weather[0].icon,
      };

      setWeatherData(formatted);
      updateHistory(formatted.city);
    } catch (err) {
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 relative">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        🌦️ Weather Dashboard
      </h1>

      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Enter city"
          className="w-64"
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={() => handleFetchWeather()} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      {loading && (
        <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded shadow border border-blue-200 dark:border-gray-700">
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
        </div>
      )}

      {!loading && weatherData && <WeatherCard data={weatherData} />}

      <RecentSearches history={history} onSelect={handleFetchWeather} />
      <Button
        onClick={toggleTheme}
        variant="ghost"
        className="absolute top-4 right-4 rounded-full p-2"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
