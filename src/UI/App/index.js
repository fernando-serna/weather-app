import React, { useState, useEffect, useContext } from 'react'

import { Store } from '../../Store'
import Header from '../Header'
import WeatherCards from '../WeatherCards'
import { DialogComponent as Dialog } from '../Dialog'
import { CircularProgressComponent as CircularProgress } from '../utils'
import './App.css'

const proxy = 'https://cors-anywhere.herokuapp.com/'

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
  const fetchWeather = async fields => {
    console.log('fetch weather')
    const t1 = performance.now()
    const { longitude: lng, latitude: lat } = fields

    console.log({ env: process.env.NODE_ENV === 'development' })
    const weatherUrl = `${process.env.WEATHER_API}/${lat},${lng}`

    const weatherProxy = proxy + weatherUrl
    // debugger
    console.log({ weatherProxy })
    const weatherData = await fetch(weatherProxy)
    const weatherDataJSON = await weatherData.json()

    const t2 = performance.now()
    console.log(`getting weather took ${t2 - t1} ms`)
    // dispatch()

    return { ...fields, ...weatherDataJSON }
  }

  const getLocation = async zip => {
    console.log('get location')
    setLoading(true)
    const t1 = performance.now()
    // const proxy = 'https://cors-anywhere.herokuapp.com/'
    const zipUrl = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}&facet=state&facet=timezone&facet=dst`

    // const zipProxy = proxy + zipUrl

    // `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}&facet=state&facet=timezone&facet=dst`

    const zipData = await fetch(zipUrl)
    const zipDataJSON = await zipData.json()
    console.log({ zipDataJSON })
    const { fields } = zipDataJSON.records[0]


    // const { fields } = zipDataJSON.records[0]
    const t2 = performance.now()
    console.log(`getting location took ${t2 - t1} ms`)
    const city = await fetchWeather(fields)

    const cities = [...state.cities, city]

    const locations = [...state.locations, { ...fields }]

    localStorage.setItem('locations', JSON.stringify(locations))

    dispatch({
      type: 'SET_LOCATIONS',
      payload: locations
    })
    dispatch({
      type: 'SET_CITIES',
      payload: cities
    })
    dispatch({
      type: 'SET_DIMENSIONS',
      payload: { height: window.innerHeight, width: window.innerWidth }
    })

    setLoading(false)
  }

  /*
    When user submits a new zipcode, close dialog, open loading component,
    await the retreival of new data and then close the loading component
  */
  const handleSubmit = async zip => {
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

    dispatch({ type: 'SET_ZIP', payload: Number(fields.zip) })

    const city = await fetchWeather(fields)

    const cities = [...state.cities, city]
    const { longitude: lng, latitude: lat, zip } = fields

    const locations = [...state.locations, { ...fields }]
    localStorage.setItem('locations', JSON.stringify(locations))

    dispatch({
      type: 'SET_CITIES',
      payload: cities
    })
    dispatch({
      type: 'SET_LOCATIONS',
      payload: locations
    })

    setLoading(false)
  }

  const err = () => {
    console.log('err')
    setLoading(false)
  }

  const handleLocation = () => {
    console.log("handle lco")
    setOpen(false)
    setLoading(true)
    navigator.geolocation.getCurrentPosition(succ, err)
  }

  const getNetworkCities = async locations => {
    const newCities = await Promise.all(
      locations.map(async location => fetchWeather(location))
    )
    console.info('*****Network Cities*****')
    // debugger
    return dispatch({ type: 'SET_CITIES', payload: newCities })
  }

  const getCacheCities = async locations => {
    if (!('caches' in window)) {
      return null
    }

    const cacheCities = await Promise.all(
      locations.map(async location => {
        console.info('*****Cache Cities*****')
        const { longitude: lng, latitude: lat } = location
        const weatherUrl = `${proxy + process.env.WEATHER_API}/${lat},${lng}`
        // const url = `${window.location.origin}/${weatherUrl}`

        // debugger

        return caches.match(weatherUrl)
          .then(async response => {
            // debugger
            if (response) {
              console.log('there is a response')

              const weather = await response.json()
              // debugger
              return { ...weather, ...location }
            }

            console.log('no response')
            // const networkResponse = await fetchWeather(location)
            return null
          })
          .catch(e => {
            console.error('Error getting data from cache', e)
            return null
          })
      })
    )

    if (cacheCities[0]) {
      console.log('setting cities')
      dispatch({ type: 'SET_CITIES', payload: cacheCities })
    }
  }

  /* Fetch weather on empty weather object */
  useEffect(() => {
    if (Object.keys(state.cities).length === 0) {
      const locationsJSON = localStorage.getItem('locations')

      if (locationsJSON) {
        const locations = JSON.parse(locationsJSON)
        dispatch({
          type: 'SET_LOCATIONS',
          payload: locations
        })

        getCacheCities(locations)
        getNetworkCities(locations)
        // const v = await fetchWeather(location)

        // getNetworkCities(locations)
      } else {
        getLocation(state.currentZip)
      }
    }
    console.info('*****APP mounted*****')
  }, [])

  useEffect(() => {
    console.log('cities updated', state.cities)
  }, [state.cities])

  /* Add window resize listener to decide whether or not chart should be rendered */
  // useEffect(() => {
  //   console.log('resize')
  //   const handleResize = () => {
  //     setWidth(window.innerWidth)
  //     setHeight(window.innerHeight)
  //     dispatch({
  //       type: 'SET_DIMENSIONS',
  //       payload: { height: window.innerHeight, width: window.innerWidth }
  //     })
  //   }

  //   window.addEventListener('resize', handleResize)
  //   return () => { window.removeEventListener('resize', handleResize) }
  // }, [])

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
      <Header refresh={locations => getNetworkCities(locations)} onOpen={() => setOpen(true)} />

      <WeatherCards width={width} height={height} loading={loading} />
    </div>
  )
}

export default App
