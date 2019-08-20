import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Store } from '../../Store'
import CurrentWeather from '../CurrentWeather'
import './WeatherCards.css'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: '100%',
    height: 'fit-content',
    backgroundColor: '#282c34',
  },
  content: {
    width: '100%',
  },
  progress: {
    margin: theme.spacing(2)
  }
}))

const WeatherCards = props => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)
  const { height, width, loading } = props

  const removeCity = zip => {
    const newCities = [...state.cities.filter(city => city.zip !== zip)]
    const locations = [...state.locations.filter(location => location.zip !== zip)]

    localStorage.setItem('locations', JSON.stringify(locations))

    dispatch({ type: 'SET_CITIES', payload: newCities })
    dispatch({ type: 'SET_LOCATIONS', payload: locations })
  }

  return (
    <div className="weatherCards">
      {state.cities.map(city => (
        <div key={city.zip} className="weatherCard">
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <CurrentWeather
                height={height}
                width={width}
                weather={city}
                onDelete={zip => removeCity(zip)}
              />
            </CardContent>
          </Card>
        </div>
      ))}
      {loading ? (
        <div className="loading">
          <CircularProgress color="secondary" className={classes.progress} />
        </div>
      ) : null}
    </div>
  )
}

export default WeatherCards
