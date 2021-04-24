import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "destyle.css";

import { WiCloud, WiDaySunny, WiRain } from "react-icons/wi";
import {
  Main,
  Section,
  Weather,
  Description,
  Temperature,
  City
} from "./App.styled";
import {GlobalStyle} from "./styled/globals.styled";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      main: null,
      name: null,
      loading: true,
      error: null,
    };
    this.abortController = new AbortController();
  }

  getPosition(success, error) {
    if (!navigator.geolocation) {
      return error({
        message: "Geolocation API not supported by your browser",
      });
    } else {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      return navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }

  async fetchWeatherData(latitude, longitude) {
    try {
      const options = { signal: this.abortController.signal };
      const response = await fetch(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`,
        options
      );
      const { weather, main, name } = await response.json();
      this.setState({ weather, main, name, loading: false });
    } catch (e) {
      if (e instanceof DOMException)
        return console.log("Fetch request aborted");
      console.error(e);
    }
  }

  getData() {
    const onPositionSuccessful = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.fetchWeatherData(latitude, longitude);
    };

    const onPositionError = ({ message }) => {
      this.setState({ error: message, loading: false });
    };

    this.getPosition(onPositionSuccessful, onPositionError);
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    if (this.state.loading) return <div>loading...</div>;
    if (this.state.error) return <div>{this.state.error}</div>;

    const design = {
      Clouds:
        "linear-gradient(180deg, rgba(144, 164, 174, 1) 0%, rgba(144, 164, 174, .8) 100%);",
      Rain:
        "linear-gradient(180deg, rgba(63, 81, 181, 1) 0%, rgba(63, 81, 181, .8) 100%);",
      Sun:
        "linear-gradient(180deg, rgba(255, 179, 0, 1) 0%, rgba(255, 179, 0, .8) 100%);",
    };

    const icons = {
      Clouds: WiCloud,
      Rain: WiRain,
      Sun: WiDaySunny,
    };

    const main = this.state.weather[0].main;
    const Icon = icons[main];

    return (
      <>
        <GlobalStyle />
        <Main background={design[this.state.weather[0].main]} >
          <Section>
            <Icon
              style={{ color: "#fff", fontSize: "5rem", fontWeight: 800 }}
              title={`${this.state.weather[0].main.toLowerCase()}-icon`}
            />
            <Weather>{this.state.weather[0].main}</Weather>
            <Description>{this.state.weather[0].description}</Description>
            <Temperature>{this.state.main.temp}°C</Temperature>
            <City>{this.state.name}</City>
          </Section>
        </Main>
      </>
    );
  }
}

export default hot(module)(App);
