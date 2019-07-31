import React from 'react'

import CurrentWeather from '../CurrentWeather'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import { DrawerComponent as Drawer } from '../Drawer'
import Footer from '../Footer'
import './App.css'

const App = () => (
  <div className="App">
    <div className="currentWeather">
      <CurrentWeather />
    </div>
    <div className="weatherChart">
      <WeatherChart />
    </div>
    <div className="forecast">
      <Forecast />
    </div>
    <div className="footer">
      <Footer />
    </div>
  </div>
)

export default App
