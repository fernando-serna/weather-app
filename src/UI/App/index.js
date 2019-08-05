import React, { useState, useEffect, useContext } from 'react'
import { Store } from '../../Store'

import CurrentWeather from '../CurrentWeather'
import { DialogComponent as Dialog } from '../Dialog'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import './App.css'

const App = () => {
  const { state, dispatch } = useContext(Store)
  const [open, setOpen] = useState(false)

  const weatherApiKey = 'bcce35b25122edecf0adb53cdda3f218'

  const fetchWeather = async zip => {
    const zipUrl = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}&facet=state&facet=timezone&facet=dst`

    const zipData = await fetch(zipUrl)
    const zipDataJSON = await zipData.json()
    const { fields } = zipDataJSON.records[0]
    const { latitude, longitude } = fields

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${weatherApiKey}`
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${weatherApiKey}`


    const weatherData = await fetch(weatherUrl)
    const weatherDataJSON = await weatherData.json()

    const forecastData = await fetch(forecastUrl)
    const forecastDataJSON = await forecastData.json()

    return dispatch({
      type: 'FETCH_WEATHER',
      payload: { ...weatherDataJSON, ...forecastDataJSON, ...fields }
    })
  }

  useEffect(() => {
    if (Object.keys(state.weather).length === 0) {
      fetchWeather(state.currentZip)
    }
  })

  return (
    <div className="App">
      {open
        ? <Dialog onClose={() => setOpen(false)} fetchWeather={zip => fetchWeather(zip)} />
        : null
      }
      <CurrentWeather weather={state.weather} onOpen={() => setOpen(true)} />
      <WeatherChart weather={state.weather} />
      <Forecast weather={state.weather} />
    </div>
  )
}

export default App
