import React, { useState, useEffect, useContext } from 'react'
import { Store } from '../../Store'

import Header from '../Header'
import WeatherCards from '../WeatherCards'
import { DialogComponent as Dialog } from '../Dialog'

import './App.css'

const proxy = process.env.REACT_APP_PROXY_URL
const darkSkyURL = process.env.REACT_APP_WEATHER_API
const zipApiUrl = process.env.REACT_APP_ZIP_API

const App = () => {
  const { state, dispatch } = useContext(Store)
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [loading, setLoading] = useState(false)
  const [employeeState, setEmployee] = useState({
    empName: null,
    age: null,
    depts: [],
    groups: []
  })
  const [depts, setDepts] = useState([{
    name: 'some name',
    code: 'some code'
  }])
  const [groups, setGroups] = useState([{
    name: 'some group',
    code: 'some code'
  }])

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
    setLoading(true) // show loading indicator

    try {
      const t1 = performance.now() // start performance metric

      const zipUrl = zipApiUrl.replace('ZIPCODE', zip) // replace  ZIPCODE in url with zip param
      const zipData = await fetch(zipUrl)
      const zipDataJSON = await zipData.json()

      const { fields } = zipDataJSON.records[0]
      const locations = [{ ...fields }, ...state.locations]
      localStorage.setItem('locations', JSON.stringify(locations))

      const t2 = performance.now()
      console.info(`Location fetch took ${t2 - t1} ms`)

      const city = await fetchWeather(fields)
      const cities = [city, ...state.cities]

      dispatch({ type: 'SET_LOCATIONS', payload: locations })
      dispatch({ type: 'SET_CITIES', payload: cities })
      dispatch({ type: 'SET_DIMENSIONS', payload: { height: window.innerHeight, width: window.innerWidth } })
    } catch (error) {
      console.error({ error })
    }

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
    if (Object.entries(state.cities).length === 0) {
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
    // const initialMount = () => {
    //   const locationJSON = sessionStorage.getItem('fs.weather.locations')

    //   if (locationJSON) {
    //     console.log('locations exist')
    //   } else {
    //     getLocation(state.currentZip)
    //   }
    // }

    // // if there are no cities loaded in
    // if (Object.entries(state.cities)) {
    //   initialMount()
    // }


    let dptList = [...depts]
    const groupLst = [...groups]
    setEmployee({ ...employeeState, depts: dptList, groups: groupLst })

    dptList = [0]
  }, [])

  useEffect(() => {
    console.log({ employeeState })
  }, [employeeState])

  /* Window resize listener to decide whether or not chart should be rendered */
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
