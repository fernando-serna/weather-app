import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Example from './tempChart'
import './WeatherChart.css'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '125px',
    fontSize: '11px'
  }
}))

const WeatherChart = () => {
  const classes = useStyles()

  return (
    <div className="weatherChart">
      <div className="wc-buttons">
        <Button variant="outlined" color="primary" className={classes.button}>
          Temperature
        </Button>
        <Button variant="outlined" color="primary" className={classes.button}>
          Precipitation
        </Button>
        <Button variant="outlined" color="primary" className={classes.button}>
          Wind
        </Button>
      </div>
      <Example />
    </div>
  )
}

export default WeatherChart
