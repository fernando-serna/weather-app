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

  /* When component mounts, set initial forecast data */
  useEffect(() => {
    const day = new Date()
    const week = []

    week.push({
      id: 0,
      name: moment(day).format('L'),
      title: 'Today',
      high: Number.NEGATIVE_INFINITY,
      low: Number.POSITIVE_INFINITY,
      icon: ''
    })

    for (let i = 1; i < 7; i += 1) {
      week.push({
        id: 1,
        name: moment(day).add(i, 'days').format('L'),
        title: moment(day).add(i, 'days').format('dddd'),
        high: Number.NEGATIVE_INFINITY,
        low: Number.POSITIVE_INFINITY,
        icon: ''
      })
    }

    setForecast(week)
  }, [])

  /*
    On new weather data, for each day in the forecasted week, find the
    corresponding days from the new weather data and store high and low
    temperatures and icons for those days.
  */
  useEffect(() => {
    if (Object.keys(weather).length) {
      const { forecastPeriods } = weather
      const forecastWeek = [...forecast]

      forecastWeek.forEach((day, index) => {
        const date = new Date(day.name)
        const period = forecastPeriods.filter(x => moment(x.startTime).isSame(date, 'day'))

        const high = period.find(key => key.isDaytime)
        const low = period.find(key => !key.isDaytime)

        if (low) {
          forecastWeek[index] = { ...forecastWeek[index], low: low.temperature, icon: low.icon }
        }
        if (high) {
          forecastWeek[index] = { ...forecastWeek[index], high: high.temperature, icon: high.icon }
        }
      })

      setForecast(forecastWeek)
    }
  }, [weather])

  return (
    <div className="forecast">
      {forecast.map(day => (
        <div key={day.title} className="forecast-item">
          <div className="forecast-day">
            <Typography color="secondary" variant="body1">
              {day.title}
            </Typography>
          </div>
          <div className="forecast-icon">
            <Icon icon={day.icon} fill={theme.palette.primary.main} height={64} width={64} />
          </div>
          <div className="forecast-temp">
            <Typography color="secondary" variant="body1">
              {day.high > Number.NEGATIVE_INFINITY ? `${day.high}\u00b0` : null}
              &nbsp;|&nbsp;
              {day.low < Number.POSITIVE_INFINITY ? `${day.low}\u00b0` : null}
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
