import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { IconComponent as Icon } from '../utils'

import './Forecast.css'

const Forecast = props => {
  const { weather } = props
  const theme = useTheme()
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    const day = new Date()
    const week = []

    week.push({
      name: 'Today',
      high: Number.NEGATIVE_INFINITY,
      low: Number.POSITIVE_INFINITY,
      icon: ''
    })

    for (let i = 1; i < 7; i += 1) {
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
      const { forecastPeriods } = weather
      const forecastWeek = [...forecast]

      for (let i = 0; i < forecastWeek.length; i += 1) {
        forecastWeek[i].high = forecastPeriods[i * 2].temperature
        forecastWeek[i].low = forecastPeriods[i * 2 + 1].temperature
        forecastWeek[i].icon = forecastPeriods[i * 2].icon
      }

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

Forecast.propTypes = {
  weather: PropTypes.shape({
    forecastPeriods: PropTypes.array
  }).isRequired
}

export default Forecast
