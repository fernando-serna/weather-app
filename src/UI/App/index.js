import React, { useEffect } from 'react'
import { Store } from '../../Store'

import CurrentWeather from '../CurrentWeather'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import './App.css'

const App = () => {
  const { state, dispatch } = React.useContext(Store)
  const weatherApiKey = 'bcce35b25122edecf0adb53cdda3f218'

  const fetchCurrentWeather = async zip => {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=98007,us&units=imperial&APPID=${weatherApiKey}`
    const weatherData = await fetch(weatherUrl)
    const weatherDataJSON = await weatherData.json()

    return dispatch({
      type: 'FETCH_CURRENT_WEATHER',
      payload: weatherDataJSON
    })
  }

  // const fetchDataAction = async () => {
  //   const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
  //   const dataJSON = await data.json();
  //   return dispatch({
  //     type: 'FETCH_DATA',
  //     payload: dataJSON._embedded.episodes
  //   });
  // };

  useEffect(() => {
    Object.keys(state.currentWeather).length === 0 && fetchCurrentWeather()
  })

  useEffect(() => {
    console.log({ state })
  }, [state])

  return (
    <div className="App">
      {Object.keys(state.currentWeather).length ? <CurrentWeather weather={state.currentWeather} /> : null}
      <WeatherChart />
      <Forecast />
    </div>
  )
}

export default App
