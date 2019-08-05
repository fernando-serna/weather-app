import React, { useEffect } from 'react'
import { Store } from '../../Store'

import CurrentWeather from '../CurrentWeather'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import './App.css'

const App = () => {
  const { state, dispatch } = React.useContext(Store)
  const weatherApiKey = 'bcce35b25122edecf0adb53cdda3f218'
  const zipApiKey = 'js-8VJ3dpo17MwCTKBwNR5T7H0Am37wT36CC9mKYxI2JT5AR9S4cxx2fph08ioe0CQ6'

  const fetchWeather = async zip => {
    const zipUrl = `https://www.zipcodeapi.com/rest/${zipApiKey}/info.json/98007/degrees`

    const zipData = await fetch(zipUrl)
    const zipDataJSON = await zipData.json()

    const { lat, lng } = zipDataJSON

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=${weatherApiKey}`
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=imperial&APPID=${weatherApiKey}`


    const weatherData = await fetch(weatherUrl)
    const weatherDataJSON = await weatherData.json()

    const forecastData = await fetch(forecastUrl)
    const forecastDataJSON = await forecastData.json()

    return dispatch({
      type: 'FETCH_WEATHER',
      payload: { ...weatherDataJSON, ...forecastDataJSON, ...zipDataJSON }
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
    Object.keys(state.weather).length === 0 && fetchWeather()
  })

  return (
    <div className="App">
      <CurrentWeather weather={state.weather} />
      <WeatherChart weather={state.weather} />
      <Forecast weather={state.weather} />
    </div>
  )
}

export default App
