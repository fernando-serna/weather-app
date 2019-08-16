import React, { useState, useEffect, useContext } from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

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

const arr = [1, 2, 3, 4]

const WeatherCards = props => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)
  const [open, setOpen] = useState(false)

  const removeCity = zip => {
    console.log('remove', zip)
    const newCities = [...state.cities.filter(city => city.zip_code !== zip)]
    const locations = [...state.locations.filter(location => location.zip_code !== zip)]
    localStorage.setItem('locations', JSON.stringify(locations))
    dispatch({
      type: 'SET_CITIES',
      payload: newCities
    })
    dispatch({
      type: 'SET_LOCATIONS',
      payload: locations
    })
  }

  useEffect(() => {
    console.log({ state })
  })

  return (
    <div className="weatherCards">
      {state.cities.map(city => (
        <div key={city.zip_code} className="weatherCard">
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <CurrentWeather
                weather={city}
                onOpen={() => setOpen(true)}
                onDelete={zip => removeCity(zip)}
              />
            </CardContent>
          </Card>
        </div>
      ))}
      {props.loading ? (
        <div className="loading">
          <CircularProgress color="secondary" className={classes.progress} />
        </div>
      ) : null}
    </div>
  )
}

export default WeatherCards
