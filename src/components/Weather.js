import React , {Profiler} from "react";
import {
  Weather as WeatherType,
  Description,
  Temperature,
  City,
} from "../App.styled";
import { WiCloud, WiDaySunny, WiRain } from "react-icons/wi";

 const WeatherComponent = ({ type, description, temperature, city }) => {
  const icons = {
    Clouds: WiCloud,
    Rain: WiRain,
    Sun: WiDaySunny,
  };
  const Icon = icons[type];

  const profiler = (...args) => console.info(args)

  return (
    <Profiler id="Weather" onRender={profiler}>
      <Icon
        style={{ color: "#fff", fontSize: "5rem", fontWeight: 800 }}
        title={`${type.toLowerCase()}-icon`}
      />
      <WeatherType>{type}</WeatherType>
      <Description>{description}</Description>
      <Temperature>{temperature}°C</Temperature>
      <City>{city}</City>
    </Profiler>
  );
};

 const Weather = React.memo(WeatherComponent)
 export default Weather
