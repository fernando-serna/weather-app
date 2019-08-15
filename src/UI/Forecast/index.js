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
  const [svgWidth, setSvgWidth] = useState(40)
  const [svgHeight, setSvgHeight] = useState(40)

  /* When component mounts, set initial forecast data */
  useEffect(() => {
    const day = new Date()
    const week = []

    for (let i = 1; i < 8; i += 1) {
      week.push({
        id: i,
        name: moment(day).add(i, 'days').format('L'),
        title: moment(day).add(i, 'days').format('ddd'),
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
      const week = []
      const { daily } = weather
      const { data } = daily
      console.log({ weather })

      for (let i = 1; i < data.length; i += 1) {
        week.push({
          id: i,
          name: moment(new Date(data[i].time * 1000)).format('L'),
          title: moment(new Date(data[i].time * 1000)).format('ddd'),
          high: Math.round(data[i].temperatureHigh),
          low: Math.round(data[i].temperatureLow),
          icon: data[i].icon
        })
      }

      // forecastWeek.forEach((day, index) => {
      //   const date = new Date(day.name)
      //   const period = forecastPeriods.filter(x => moment(x.startTime).isSame(date, 'day'))

      //   const high = period.find(key => key.isDaytime)
      //   const low = period.find(key => !key.isDaytime)

      //   if (low) {
      //     forecastWeek[index] = { ...forecastWeek[index], low: low.temperature, icon: low.icon }
      //   }
      //   if (high) {
      //     forecastWeek[index] = { ...forecastWeek[index], high: high.temperature, icon: high.icon }
      //   }
      // })

      setForecast(week)
    }
  }, [weather])

  useEffect(() => {
    if (svgWidth === 40 && props.width > 600) {
      setSvgHeight(60)
      setSvgWidth(60)
    }
    if (svgWidth === 60 && props.width < 600) {
      setSvgHeight(40)
      setSvgWidth(40)
    }
  }, [props.height, props.width])

  return (
    <div className="forecast">
      {forecast.map(day => (
        <div key={day.title} className="forecast-item">
          <div className="forecast-day">
            <Typography color="secondary" variant="h6">
              {day.title}
            </Typography>
          </div>
          <div className="forecast-icon">
            <Icon icon={day.icon} fill={theme.palette.primary.main} height={svgHeight} width={svgWidth} />
          </div>
          <div className="forecast-temp">
            <Typography color="secondary" variant="h6">
              {day.high > Number.NEGATIVE_INFINITY ? `${day.high}\u00b0` : null}
            </Typography>
            <div className="forecast-border">|</div>
            <Typography color="secondary" variant="h6">
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
