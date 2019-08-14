import React, { useState, useEffect, useContext } from 'react'


import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Toolbar from '@material-ui/core/Toolbar'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen'

import { Store } from '../../Store'
import CurrentWeather from '../CurrentWeather'
import WeatherCards from '../WeatherCards'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import { DialogComponent as Dialog } from '../Dialog'
import { CircularProgressComponent as CircularProgress } from '../utils'
import './App.css'

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  root: {
    flexGrow: 1
  }
})

const App = () => {
  const classes = useStyles()
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

    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const testUrl = `https://api.darksky.net/forecast/8cfa31a60b0a43daccceb5451adb7568/${latitude},${longitude}`
    // const forecastUrl = `https://api.weather.gov/points/${latitude},${longitude}/forecast`
    // const hourlyUrl = `https://api.weather.gov/points/${latitude},${longitude}/forecast/hourly`
    // const sunSetRiseUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`

    const v = proxy + testUrl

    const testData = await fetch(v)

    const testDataJSON = await testData.json()

    // console.log({ testDataJSON })
    // const forecastData = await fetch(forecastUrl)
    // const forecastDataJSON = await forecastData.json()
    // const { periods: forecastPeriods } = forecastDataJSON.properties

    // const hourlyData = await fetch(hourlyUrl)
    // const hourlyDataJSON = await hourlyData.json()
    // const { periods: hourlyPeriods } = hourlyDataJSON.properties

    // const sunSetRiseData = await fetch(sunSetRiseUrl)
    // const sunSetRiseDataJSON = await sunSetRiseData.json()
    // const { results } = sunSetRiseDataJSON
    console.log('called')

    return dispatch({
      type: 'FETCH_WEATHER',
      payload: { ...fields, ...testDataJSON }
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
    const locationUrl = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude%40public&facet=dst&facet=state&facet=timezone&geofilter.distance=${latitude},${longitude},5000`

    const locationData = await fetch(locationUrl)
    const locationDataJSON = await locationData.json()

    const { fields } = locationDataJSON.records[0]

    window.localStorage.setItem('location', JSON.stringify({ ...fields }))

    dispatch({ type: 'SET_ZIP', payload: Number(fields.zip) })

    await fetchWeather()
    setLoading(false)
  }

  const err = e => {
    setLoading(false)
    alert('You must enable location services to get current location.')
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

      <header className="header">
        <h1>
          Weather App&nbsp;
          <a href="https://www.google.com" className="author">
            By Fernando Serna
          </a>
        </h1>
        <button type="button" id="butInstall" aria-label="Install">
          <AddToHomeScreenIcon />
        </button>
        <button type="button" id="butRefresh" aria-label="Refresh">
          <RefreshIcon />
        </button>
      </header>
      <WeatherCards />
      {/* <Card className={classes.card}>
        <CardContent>
          <CurrentWeather weather={state.weather} onOpen={() => setOpen(true)} />
          {width > 600 && height > 600 ? <WeatherChart weather={state.weather} /> : null}
          <Forecast weather={state.weather} />
        </CardContent>
      </Card> */}
    </div >
  )
}

export default App
