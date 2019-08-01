import React from 'react'

import CurrentWeather from '../CurrentWeather'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import { DrawerComponent as Drawer } from '../Drawer'
import Footer from '../Footer'
import './App.css'

const App = () => (
  <div className="App">
    <CurrentWeather />
    <WeatherChart />
    <Forecast />
    <Footer />
  </div>
)

export default App
