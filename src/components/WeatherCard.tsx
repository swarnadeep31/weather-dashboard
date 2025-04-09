import Image from "next/image";

type Props = {
  data: {
    city: string;
    curr_temp: string;
    weather_cond: string;
    humidity: string;
    wind_speed: string;
    icon: string;
  };
};

export default function WeatherCard({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mt-6 w-80 text-center border border-blue-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">
        Weather in {data.city}
      </h2>

      <Image
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.weather_cond}
        width={64}
        height={64}
      />

      <p>
        <strong>Temperature:</strong> {data.curr_temp}
      </p>
      <p>
        <strong>Condition:</strong> {data.weather_cond}
      </p>
      <p>
        <strong>Humidity:</strong> {data.humidity}
      </p>
      <p>
        <strong>Wind:</strong> {data.wind_speed}
      </p>
    </div>
  );
}
