import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import "destyle.css";

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      main: null,
      loading: true,
    };
  }

  async fetchData() {
    try {
      const {weather, main} = await fetch("https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139").then((res) => res.json())
      if (this._isMounted) {
        this.setState({ weather, main, loading: false });
      }
    } catch(e) {
      console.error(JSON.stringify(e))
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.loading) return <div>loading...</div>;
    return (
      <main>
        <ul>
          <li><img src={this.state.weather[0].icon}></img></li>
          <li>{this.state.weather[0].main}</li>
          <li>{this.state.weather[0].description}</li>
          <li>{this.state.main.temp}</li>
        </ul>
      </main>
    );
  }
}

export default hot(module)(App);
