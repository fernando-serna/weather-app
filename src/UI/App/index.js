import React, { useState, useEffect, useContext } from 'react'
import { Store } from '../../Store'

import CurrentWeather from '../CurrentWeather'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import { DialogComponent as Dialog } from '../Dialog'
import { CircularProgressComponent as CircularProgress } from '../utils'
import './App.css'

const App = () => {
  const { state, dispatch } = useContext(Store)
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [loading, setLoading] = useState(false)

  /*
    Function to fetch longitude and latitude from provided zip code and use
    them in the api calls for weeather data.
  */
  const fetchWeather = async () => {
    const fields = JSON.parse(window.localStorage.getItem('location'))
    const { longitude, latitude } = fields

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

    return dispatch({
      type: 'FETCH_WEATHER',
      payload: { forecastPeriods, hourlyPeriods, ...fields, ...results }
    })
  }

  const getLocation = async zip => {
    const zipUrl = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}&facet=state&facet=timezone&facet=dst`

    const zipData = await fetch(zipUrl)
    const zipDataJSON = await zipData.json()
    const { fields } = zipDataJSON.records[0]

    window.localStorage.setItem('location', JSON.stringify({ ...fields }))

    await fetchWeather()
  }

  /*
    When user submits a new zipcode, close dialog, open loading component,
    await the retreival of new data and then close the loading component
  */
  const handleSubmit = async zip => {
    setOpen(false)
    setLoading(true)
    await getLocation(zip)
    setLoading(false)
  }

  const succ = async s => {
    const { longitude, latitude } = s.coords
    const locationUrl = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude%40public&facet=dst&facet=state&facet=timezone&geofilter.distance=${latitude},${longitude},1000`

    const locationData = await fetch(locationUrl)
    const locationDataJSON = await locationData.json()
    // debugger
    const { fields } = locationDataJSON.records[0]

    window.localStorage.setItem('location', JSON.stringify({ ...fields }))

    await fetchWeather()
    setLoading(false)
  }

  const err = e => {
    setLoading(false)
    alert('You must enable location services to get current location')
  }

  const handleLocation = () => {
    setOpen(false)
    setLoading(true)
    navigator.geolocation.getCurrentPosition(succ, err)
  }

  /* Fetch weather on empty weather object */
  useEffect(() => {
    if (Object.keys(state.weather).length === 0) {
      if (window.localStorage.getItem('location')) fetchWeather()
      else getLocation(state.currentZip)
    }
  })

  /* Add window resize listener to decide whether or not chart should be rendered */
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <div className="App">
      {open ? (
        <Dialog
          onClose={() => setOpen(false)}
          onSubmit={zip => handleSubmit(zip)}
          handleLocation={() => handleLocation()}
        />
      ) : null}
      {loading ? <CircularProgress /> : null}
      <CurrentWeather weather={state.weather} onOpen={() => setOpen(true)} />
      {width > 600 && height > 600 ? <WeatherChart weather={state.weather} /> : null}
      <Forecast weather={state.weather} />
    </div>
  )
}

export default App
