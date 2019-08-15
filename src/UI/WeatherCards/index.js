import React, { useState, useEffect, useContext } from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { Store } from '../../Store'
import CurrentWeather from '../CurrentWeather'
import './WeatherCards.css'

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    width: '100%',
    height: 'fit-content',
    backgroundColor: '#282c34',
  },
  content: {
    width: '100%',
  }
}))

const arr = [1, 2, 3, 4]

const WeatherCards = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)
  const [open, setOpen] = useState(false)

  const removeCity = zip => {
    const newCities = [...state.cities.filter(city => city.zip !== zip)]

    dispatch({
      type: 'SET_CITIES',
      payload: newCities
    })
  }

  useEffect(() => {
    console.log({ state })
  })

  return (
    <div className="weatherCards">
      {state.cities.map(city => (
        <div key={city.zip} className="weatherCard">
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
    </div>
  )
}

export default WeatherCards
