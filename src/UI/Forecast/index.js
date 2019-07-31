import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import Cloudy from '../../Icons/Cloudy'
import CloudyGusts from '../../Icons/CloudyGusts'
import DaySunny from '../../Icons/DaySunny'
import Hail from '../../Icons/Hail'
import NightClear from '../../Icons/NightClear'
import Rain from '../../Icons/Rain'
import Snow from '../../Icons/Snow'
import Thunderstorm from '../../Icons/Thunderstorm'

import './Forecast.css'

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1),
    background: theme.palette.primary.dark
  }
}))

const Forecast = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [week, setWeek] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    const days = []
    const day = new Date()

    for (let i = 0; i < 7; i += 1) {
      days.push(
        moment(day)
          .add(i, 'days')
          .format('dddd')
      )
    }

    console.log({ days, theme })
    setWeek(days)
    setSelectedDay(days[0])
  }, [])

  useEffect(() => {
    console.log({ selectedDay })
  })

  return (
    <div className="forecast-wrapper">
      {week.map(day => (
        <Card key={day} raised={day === selectedDay} className={classes.card}>
          <CardActionArea onClick={() => setSelectedDay(day)}>
            <div className="forecast-card">
              <Typography
                color={day === selectedDay ? 'primary' : 'secondary'}
                variant={day === selectedDay ? 'h5' : 'h6'}
              >
                {day}
              </Typography>
              <Cloudy fill="orange" />
              <div className="forecast-temp">
                <Typography color="secondary" variant="body1">
                  73&deg; |&nbsp;
                </Typography>
                <Typography color="secondary" variant="body1">
                  58&deg;
                </Typography>
              </div>
            </div>
          </CardActionArea>
        </Card>
      ))}
      {/* <Cloudy fill="orange" />
      <CloudyGusts fill="orange" />
      <DaySunny fill="orange" />
      <Hail fill="orange" />
      <NightClear fill="orange" />
      <Rain fill="orange" />
      <Snow fill="orange" /> */}
      {/* <Thunderstorm fill="orange" /> */}
    </div>
  )
}

export default Forecast
