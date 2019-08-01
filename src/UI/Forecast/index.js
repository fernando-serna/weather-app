import React, { useState, useCallback, useEffect } from 'react'
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

const cardWidth = 200

const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.up('768')]: {
      width: cardWidth,
      flexShrink: 0
    },
    margin: theme.spacing(1),
    background: theme.palette.primary.dark
  }
}))

const Forecast = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [week, setWeek] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const myRef = useCallback(node => {
    if (node !== null) {
      if (node.offsetHeight <= 150) {
        setHeight(node.offsetHeight)
        setWidth(node.offsetWidth / 4)
      } else {
        setHeight(node.offsetHeight / 4)
        setWidth(node.offsetWidth)
      }
      console.log(node.offsetWidth, node.offsetHeight)
    }
  }, [])

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

    setWeek(days)
    setSelectedDay(days[0])
  }, [])

  return (
    <div className="forecast">
      {week.map(day => (
        <Card key={day} raised={day === selectedDay} className={classes.card}>
          <CardActionArea onClick={() => setSelectedDay(day)}>
            <div ref={myRef} className="forecast-card">
              {height && width ? (
                <Cloudy fill="orange" height={height} width={width} />
              ) : null}
              <Typography
                color={day === selectedDay ? 'primary' : 'secondary'}
                variant={day === selectedDay ? 'h5' : 'h6'}
              >
                {day}
              </Typography>
              <div className="forecast-temp">
                <Typography
                  color={day === selectedDay ? 'primary' : 'secondary'}
                  variant="h6"
                >
                  73&deg; |&nbsp;
                </Typography>
                <Typography
                  color={day === selectedDay ? 'primary' : 'secondary'}
                  variant="h6"
                >
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
