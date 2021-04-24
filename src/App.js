import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "destyle.css";
import "./App.css";

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
      return error({message: "Geolocation API not supported by your browser"});
    } else {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      return navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
      );
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

    const onPositionError = ({message}) => {
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
    return (
      <main>
        <ul className="container">
          <li>
            <img src={this.state.weather[0].icon}></img>
          </li>
          <li>{this.state.weather[0].main}</li>
          <li>{this.state.weather[0].description}</li>
          <li>{this.state.main.temp}</li>
          <li>{this.state.name}</li>
        </ul>
      </main>
    );
  }
}

export default hot(module)(App);
