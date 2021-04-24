// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://weather-proxy.freecodecamp.rocks/api/current",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          coord: { lon: 139, lat: 35 },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "https://cdn.freecodecamp.org/weather-icons/02n.png",
            },
          ],
          base: "stations",
          main: {
            temp: 25,
            feels_like: 28.82,
            temp_min: 25,
            temp_max: 25,
            pressure: 1010,
            humidity: 84,
          },
          visibility: 10000,
          wind: { speed: 1.34, deg: 177, gust: 2.68 },
          clouds: { all: 16 },
          dt: 1597922946,
          sys: {
            type: 3,
            id: 2019346,
            country: "JP",
            sunrise: 1597867673,
            sunset: 1597915636,
          },
          timezone: 32400,
          id: 1851632,
          name: "Shuzenji",
          cod: 200,
        })
      );
    }
  ),
];
