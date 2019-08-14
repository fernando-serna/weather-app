import React, { useState, useEffect, useContext } from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'

import { Store } from '../../Store'
import CurrentWeather from '../CurrentWeather'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
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
  }
}))

const arr = [1, 2, 3]

function WeatherCards() {
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)
  const [open, setOpen] = useState(false)

  return (
    <div className="weatherCards">
      {arr.map(x => (
        <div className="weatherCard">
          <Card key={x} className={classes.card}>
            <CardContent className={classes.content}>
              <CurrentWeather weather={state.weather} onOpen={() => setOpen(true)} />
              <Forecast weather={state.weather} />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default WeatherCards
