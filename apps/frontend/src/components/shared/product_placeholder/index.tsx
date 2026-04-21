import ProductCarousel from "./ProductCarousel";
import productsData from "@/data/hot-this-week.json";

// Location: Sydney, Australia — change lat/lon to your preferred location
const LATITUDE = -33.8688;
const LONGITUDE = 151.2093;
const LOCATION_NAME = "Sydney, AU";

type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    apparent_temperature: number;
  };
};

function getWeatherDescription(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 9) return "Foggy";
  if (code <= 19) return "Drizzle";
  if (code <= 29) return "Rain";
  if (code <= 39) return "Snow";
  if (code <= 49) return "Freezing drizzle";
  if (code <= 59) return "Drizzle";
  if (code <= 69) return "Rain";
  if (code <= 79) return "Snow";
  if (code <= 84) return "Rain showers";
  if (code <= 94) return "Thunderstorm";
  return "Heavy thunderstorm";
}

async function fetchWeather(): Promise<WeatherData | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature` +
      `&timezone=auto`;
    const res = await fetch(url, { next: { revalidate: 1800 } } as RequestInit); // cache 30 min
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const ProductPlaceholder = async () => {
  const weather = await fetchWeather();

  return (
    <>
      {/* Hot This Week Carousel */}
      <ProductCarousel products={productsData} />

      {/* Weather Report */}
      <section className="w-full py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Weather Report</h2>
      <div className="max-w-sm">
        {weather ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-1 text-lg font-semibold text-gray-800">{LOCATION_NAME}</div>
            <div className="mb-4 text-sm text-gray-500">
              {getWeatherDescription(weather.current.weather_code)}
            </div>
            <div className="mb-4 text-5xl font-bold text-gray-900">
              {Math.round(weather.current.temperature_2m)}°C
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-600">
              <div className="rounded-md bg-gray-50 p-2">
                <div className="font-medium">Feels like</div>
                <div>{Math.round(weather.current.apparent_temperature)}°C</div>
              </div>
              <div className="rounded-md bg-gray-50 p-2">
                <div className="font-medium">Humidity</div>
                <div>{weather.current.relative_humidity_2m}%</div>
              </div>
              <div className="rounded-md bg-gray-50 p-2">
                <div className="font-medium">Wind</div>
                <div>{Math.round(weather.current.wind_speed_10m)} km/h</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm text-gray-500">
            Weather data unavailable
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default ProductPlaceholder;
