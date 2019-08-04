import React, { useState, useEffect } from 'react'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import Cloudy from '../../Icons/Cloudy'

import './Forecast.css'

const Forecast = props => {
  const { weather } = props
  const [forecast, setForecast] = useState([])

  const formatDay = dt => moment(dt).format('dddd')

  useEffect(() => {
    const day = new Date()
    const week = []

    for (let i = 0; i < 6; i += 1) {
      week.push({
        name: moment(day).add(i, 'days').format('dddd'),
        high: Number.NEGATIVE_INFINITY,
        low: Number.POSITIVE_INFINITY
      })
    }

    setForecast(week)
  }, [])

  useEffect(() => {
    if (Object.keys(weather).length) {
      const { dt, list } = weather
      let forecastWeek = [...forecast]
      let dayOfWeek = new Date(dt * 1000)

      list.forEach(reading => {
        const readingDate = new Date(reading.dt * 1000)
        const forecastDay = { ...forecastWeek.find(x => x.name === formatDay(readingDate)) }
        const { temp } = reading.main

        if (moment(dayOfWeek).isSame(readingDate, 'date')) {
          forecastDay.high = Math.max(forecastDay.high, temp)
          forecastDay.low = Math.min(forecastDay.low, temp)
        } else {
          dayOfWeek = readingDate
          forecastDay.high = temp
          forecastDay.low = temp
        }

        console.log({ day: formatDay(readingDate), temp, main: reading.main })
        forecastWeek = [...forecastWeek.filter(x => x.name !== formatDay(readingDate)), forecastDay]
      })

      setForecast(forecastWeek)
    }
  }, [weather])

  // Hard coded array for days of the week
  // useEffect(() => {
  //   const day = new Date(dt * 1000)
  //   const forecast = {}

  //   list.forEach(reading => {
  //     const dayOfWeek = moment(day).format('dddd')

  //     if (moment(day).isSame(moment(reading.dt * 1000), 'date')) {
  //       forecast[dayOfWeek] = {}
  //     }
  //   })

  //   for (let i = 1; i < 6; i += 1) {
  //     days.push(
  //       moment(day)
  //         .add(i, 'days')
  //         .format('dddd')
  //     )
  //   }

  //   setWeek(days)
  // }, [])

  return (
    <div className="forecast">
      {forecast.map(day => (
        <div key={day.name} className="forecast-item">
          <div className="forecast-day">
            <Typography color="secondary" variant="body1">
              {day.name}
            </Typography>
          </div>
          <div className="forecast-icon">
            <Cloudy fill="orange" height={64} width={64} />
          </div>
          <div className="forecast-temp">
            <Typography color="secondary" variant="body1">
              {Math.round(day.high)}
              &deg;
              |&nbsp;
              {Math.round(day.low)}
              &deg;
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Forecast
