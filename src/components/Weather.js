import React from "react";
import {
  Weather as WeatherType,
  Description,
  Temperature,
  City,
} from "../App.styled";
import { WiCloud, WiDaySunny, WiRain } from "react-icons/wi";

export const Weather = ({ type, description, temperature, city }) => {
  const icons = {
    Clouds: WiCloud,
    Rain: WiRain,
    Sun: WiDaySunny,
  };
  const Icon = icons[type];
  return (
    <>
      <Icon
        style={{ color: "#fff", fontSize: "5rem", fontWeight: 800 }}
        title={`${type.toLowerCase()}-icon`}
      />
      <WeatherType>{type}</WeatherType>
      <Description>{description}</Description>
      <Temperature>{temperature}°C</Temperature>
      <City>{city}</City>
    </>
  );
};
