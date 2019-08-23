import React, { useState, useEffect, useContext } from 'react'
import { Store } from '../../Store'

import Header from '../Header'
import WeatherCards from '../WeatherCards'
import { DialogComponent as Dialog } from '../Dialog'

import './App.css'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const darkSkyURL = 'https://api.darksky.net/forecast/8cfa31a60b0a43daccceb5451adb7568'

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
    const t1 = performance.now()
    const { longitude: lng, latitude: lat } = fields

    const weatherUrl = `${darkSkyURL}/${lat},${lng}`

    const weatherProxy = proxy + weatherUrl
    const weatherData = await fetch(weatherProxy)
    const weatherDataJSON = await weatherData.json()

    const t2 = performance.now()
    console.log(`Weather fetch took ${t2 - t1} ms`)

    return { ...fields, ...weatherDataJSON }
  }

  const getLocation = async zip => {
    setLoading(true)
    const t1 = performance.now()

    const zipUrl = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}&facet=state&facet=timezone&facet=dst`
    const zipData = await fetch(zipUrl)
    const zipDataJSON = await zipData.json()

    const { fields } = zipDataJSON.records[0]
    const locations = [{ ...fields }, ...state.locations]
    localStorage.setItem('locations', JSON.stringify(locations))

    const t2 = performance.now()
    console.log(`getting location took ${t2 - t1} ms`)

    const city = await fetchWeather(fields)
    const cities = [city, ...state.cities]

    dispatch({ type: 'SET_LOCATIONS', payload: locations })
    dispatch({ type: 'SET_CITIES', payload: cities })
    dispatch({ type: 'SET_DIMENSIONS', payload: { height: window.innerHeight, width: window.innerWidth } })
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
    const { longitude, latitude } = s.coords

    const locationUrl = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude%40public&facet=dst&facet=state&facet=timezone&geofilter.distance=${latitude},${longitude},5000`
    const locationData = await fetch(locationUrl)
    const locationDataJSON = await locationData.json()

    const { fields } = locationDataJSON.records[0]
    const locations = [{ ...fields }, ...state.locations]
    localStorage.setItem('locations', JSON.stringify(locations))

    const city = await fetchWeather(fields)
    const cities = [city, ...state.cities]

    dispatch({ type: 'SET_ZIP', payload: Number(fields.zip) })
    dispatch({ type: 'SET_CITIES', payload: cities })
    dispatch({ type: 'SET_LOCATIONS', payload: locations })
    setLoading(false)
  }

  const err = () => {
    setLoading(false)
  }

  const handleLocation = () => {
    setOpen(false)
    setLoading(true)
    navigator.geolocation.getCurrentPosition(succ, err)
  }

  const getNetworkCities = async locations => {
    const newCities = await Promise.all(
      locations.map(async location => fetchWeather(location))
    )

    return dispatch({ type: 'SET_CITIES', payload: newCities })
  }

  const getCacheCities = async locations => {
    if (!('caches' in window)) {
      return null
    }

    const cacheCities = await Promise.all(
      locations.map(async location => {
        const { longitude: lng, latitude: lat } = location
        const weatherUrl = `${proxy + darkSkyURL}/${lat},${lng}`

        return caches.match(weatherUrl)
          .then(async response => {
            if (response) {
              const weather = await response.json()
              return { ...weather, ...location }
            }
            return null
          })
          .catch(e => {
            console.error('Error getting data from cache', e)
            return null
          })
      })
    )

    if (cacheCities[0]) {
      return dispatch({ type: 'SET_CITIES', payload: cacheCities })
    }

    return null
  }

  function componentDidMount() {
    if (Object.keys(state.cities).length === 0) {
      const locationsJSON = localStorage.getItem('locations')

      if (locationsJSON) {
        const locations = JSON.parse(locationsJSON)
        dispatch({ type: 'SET_LOCATIONS', payload: locations })
        getCacheCities(locations)
        getNetworkCities(locations)
      } else {
        getLocation(state.currentZip)
      }
    }
  }

  /* Fetch weather on empty weather object */
  useEffect(() => {
    componentDidMount()
    // eslint-disable-next-line
  }, [])

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
      <Header refresh={locations => getNetworkCities(locations)} onOpen={() => setOpen(true)} />
      <WeatherCards width={width} height={height} loading={loading} />
    </div>
  )
}

export default App
