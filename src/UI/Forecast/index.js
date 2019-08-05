import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Cloudy from '../../Icons/Cloudy'
import { IconComponent as Icon } from '../utils'

import './Forecast.css'

const Forecast = props => {
  const { weather } = props
  const theme = useTheme()
  const [forecast, setForecast] = useState([])

  const formatDay = dt => moment(dt).format('dddd')

  useEffect(() => {
    const day = new Date()
    const week = []

    for (let i = 1; i < 6; i += 1) {
      week.push({
        name: moment(day).add(i, 'days').format('dddd'),
        high: Number.NEGATIVE_INFINITY,
        low: Number.POSITIVE_INFINITY,
        icon: ''
      })
    }

    setForecast(week)
  }, [])

  useEffect(() => {
    if (Object.keys(weather).length) {
      const { dt, list } = weather
      let forecastWeek = [...forecast]
      let dayOfWeek = new Date(dt * 1000)

      forecastWeek.unshift({
        name: formatDay(dayOfWeek),
        high: weather.main.temp,
        low: weather.main.temp,
        icon: weather.weather[0].icon
      })

      list.forEach(reading => {
        const readingDate = new Date(reading.dt * 1000)
        const forecastDay = { ...forecastWeek.find(x => x.name === formatDay(readingDate)) }
        const { temp } = reading.main

        if (moment(dayOfWeek).isSame(readingDate, 'date')) {
          if (forecastDay.high < temp) {
            forecastDay.icon = reading.weather[0].icon
          }

          forecastDay.high = Math.max(forecastDay.high, temp)
          forecastDay.low = Math.min(forecastDay.low, temp)
        } else {
          dayOfWeek = readingDate
          forecastDay.high = temp
          forecastDay.low = temp
          forecastDay.icon = reading.weather[0].icon
        }

        forecastWeek = [...forecastWeek.filter(x => x.name !== formatDay(readingDate)), forecastDay]
      })

      setForecast(forecastWeek)
    }
  }, [weather])

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
            <Icon icon={day.icon} fill={theme.palette.primary.main} height={64} width={64} />
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
