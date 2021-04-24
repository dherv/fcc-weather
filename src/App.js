import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import "destyle.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { weather: null, main: null, loading: true };
    this.abortController = new AbortController()
  }

  async fetchData() {
    try {
        const options = { signal: this.abortController.signal }
        const response = await fetch("https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139", options)
        const { weather, main } = await response.json()
        this.setState({ weather, main, loading: false });
    } catch(e) {
      if(e instanceof DOMException) return console.log("the component aborted the fetch request")
      console.error(e)
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.abortController.abort()
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
