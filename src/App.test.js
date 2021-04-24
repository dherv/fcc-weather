import React from 'react'
import {render, screen} from "@testing-library/react"
import App from './App'

const mockGeolocation = {
  getCurrentPosition: jest.fn((success, error) => success({coords: {latitude: 35, longitude: 134}})),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

describe("App component", () => {
  test("should render the loading screen", () => {
    render(<App/>)
    expect(screen.getByText("loading...")).toBeDefined()
  })
  test("should render the current weather main", async () => {
    render(<App/>)
    expect(await screen.findByText("Clouds")).toBeDefined()
  })

  test("should render the current weather description", async () => {
    render(<App/>)
    expect(await screen.findByText("few clouds")).toBeDefined()
  })

  test("should render the current weather icon", async () => {
    render(<App/>)
    expect(await screen.findByTitle("clouds-icon")).toBeDefined()
  })

  test("should render the current weather temperature", async () => {
    render(<App/>)
    expect(await screen.findByText("25°C")).toBeDefined()
  })

  test("should render the current city name", async () => {
    render(<App/>)
    expect(await screen.findByText("Shuzenji")).toBeDefined()
  })
})