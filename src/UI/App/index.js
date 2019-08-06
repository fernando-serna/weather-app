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

    const forecastUrl = `https://api.weather.gov/points/${latitude},${longitude}/forecast`
    const hourlyUrl = `https://api.weather.gov/points/${latitude},${longitude}/forecast/hourly`
    const sunSetRiseUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`

    const forecastData = await fetch(forecastUrl)
    const forecastDataJSON = await forecastData.json()
    const { periods: forecastPeriods } = forecastDataJSON.properties

    const hourlyData = await fetch(hourlyUrl)
    const hourlyDataJSON = await hourlyData.json()
    const { periods: hourlyPeriods } = hourlyDataJSON.properties

    const sunSetRiseData = await fetch(sunSetRiseUrl)
    const sunSetRiseDataJSON = await sunSetRiseData.json()
    const { results } = sunSetRiseDataJSON

    const puppy = { forecastPeriods, hourlyPeriods, ...fields, ...results }

    return dispatch({
      type: 'FETCH_WEATHER',
      payload: { forecastPeriods, hourlyPeriods, ...fields, ...results }
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
      {/* <WeatherChart weather={state.weather} /> */}
      {/* <Forecast weather={state.weather} /> */}
    </div>
  )
}

export default App
