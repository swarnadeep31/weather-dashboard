export interface WeatherData {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
  }
  
  export interface ForecastItem {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
      main: string;
    }[];
  }
  