import React, { useState, useEffect, useContext } from 'react'

import { Store } from '../../Store'
import Header from '../Header'
import WeatherCards from '../WeatherCards'
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
    console.log('fetch weather')
    const fields = JSON.parse(window.localStorage.getItem('location'))
    const { longitude, latitude } = fields

    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const weatherUrl = `https://api.darksky.net/forecast/8cfa31a60b0a43daccceb5451adb7568/${latitude},${longitude}`

    const weatherProxy = proxy + weatherUrl
    const weatherData = await fetch(weatherProxy)
    const weatherDataJSON = await weatherData.json()

    dispatch({
      type: 'SET_DIMENSIONS',
      payload: { height: window.innerHeight, width: window.innerWidth }
    })

    dispatch({
      type: 'SET_CITIES',
      payload: [...state.cities, { ...fields, ...weatherDataJSON }]
    })

    return dispatch({
      type: 'FETCH_WEATHER',
      payload: { ...fields, ...weatherDataJSON }
    })
  }

  const getLocation = async zip => {
    console.log('get location')
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
    console.log('handle submit')
    console.log(zip)
    setOpen(false)
    if (state.cities.some(city => city.zip === String(zip))) {
      return
    }
    setLoading(true)
    await getLocation(zip)
    setLoading(false)
  }

  const succ = async s => {
    console.log('succ')
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

  const err = () => {
    console.log('err')
    setLoading(false)
    alert('You must enable location services to get current location.')
  }

  const handleLocation = () => {
    console.log("handle lco")
    setOpen(false)
    setLoading(true)
    navigator.geolocation.getCurrentPosition(succ, err)
  }

  /* Fetch weather on empty weather object */
  useEffect(() => {
    console.log('using effect')
    if (Object.keys(state.weather).length === 0) {
      console.log('effect succ')
      if (window.localStorage.getItem('location')) fetchWeather()
      else getLocation(state.currentZip)
    }
  }, [state.weather])

  /* Add window resize listener to decide whether or not chart should be rendered */
  useEffect(() => {
    console.log('resize')
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
      dispatch({
        type: 'SET_DIMENSIONS',
        payload: { height: window.innerHeight, width: window.innerWidth }
      })
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <div className="App">
      {/* <div className="background" /> */}
      {open ? (
        <Dialog
          onClose={() => setOpen(false)}
          onSubmit={zip => handleSubmit(zip)}
          handleLocation={() => handleLocation()}
        />
      ) : null}
      {loading ? <CircularProgress /> : null}
      <Header onOpen={() => setOpen(true)} />

      <WeatherCards width={width} height={height} />
      {/* <Card className={classes.card}>
        <CardContent>
          <CurrentWeather weather={state.weather} onOpen={() => setOpen(true)} />
          {width > 600 && height > 600 ? <WeatherChart weather={state.weather} /> : null}
          <Forecast weather={state.weather} />
        </CardContent>
      </Card> */}
    </div>
  )
}

export default App
