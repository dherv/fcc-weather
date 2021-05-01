import React, { Component, Suspense } from "react";
import { hot } from "react-hot-loader";
import "destyle.css";

import { Template } from "./components/Template";

const Weather = React.lazy(() => import("./components/Weather"));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      main: null,
      city: null,
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
        enableHighAccuracy: false,
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
      this.setState({ weather, main, city: name, loading: false });
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
    if (this.state.loading) return <Template>loading...</Template>;
    if (this.state.error) return <Template>{this.state.error}</Template>;

    const { main, description } = this.state.weather[0];

    return (
      <Template main={main}>
        <Suspense fallback={<Template>loading...</Template>}>
          <Weather
            type={main}
            description={description}
            temperature={this.state.main.temp}
            city={this.state.city}
          />
        </Suspense>
      </Template>
    );
  }
}

export default hot(module)(App);
