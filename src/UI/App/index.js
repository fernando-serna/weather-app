import React from 'react'

import CurrentWeather from '../CurrentWeather'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import './App.css'

const App = () => (
  <div className="App">
    <CurrentWeather />
    <WeatherChart />
    <Forecast />
  </div>
)

export default App
