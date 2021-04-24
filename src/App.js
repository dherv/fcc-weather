import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "destyle.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { weather: null, main: null, loading: true, locating: null };
    this.abortController = new AbortController();
  }

  getPosition(success, error) {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return error({ error: "no geolocation" });
    } else {
      console.log("Locating…");
      return navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  async fetchWeatherData(latitude, longitude) {
    try {
      const options = { signal: this.abortController.signal };
      const response = await fetch(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`,
        options
      );
      const { weather, main } = await response.json();
      this.setState({ weather, main, loading: false });
    } catch (e) {
      if (e instanceof DOMException)
        return console.log("the component aborted the fetch request");
      console.error(e);
    }
  }

  getData() {
    const onPositionSuccessful = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.fetchWeatherData(latitude, longitude);
    };

    const onPositionError = () => {
      console.error("could not locate");
      this.setState({ locating: "could not locate" });
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
    if (this.state.locating) return <div>{this.state.locating}</div>;
    return (
      <main>
        <ul className="container">
          <li>
            <img src={this.state.weather[0].icon}></img>
          </li>
          <li>{this.state.weather[0].main}</li>
          <li>{this.state.weather[0].description}</li>
          <li>{this.state.main.temp}</li>
        </ul>
      </main>
    );
  }
}

export default hot(module)(App);
