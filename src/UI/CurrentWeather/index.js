import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { IconComponent as Icon } from '../utils'
import './CurrentWeather.css'

const CurrentWeather = props => {
  const theme = useTheme()
  const { weather, onOpen } = props
  const [values, setValues] = useState({
    city: ' ----- ',
    state: ' ----- ',
    date: moment(new Date()).format('dddd h:mm A'),
    temp: 0,
    icon: '',
    shortForecast: ' ----- ',
    sunrise: ' ----- ',
    sunset: ' ----- ',
    wind: ' ----- '
  })

  /* Update data on new weather props */
  useEffect(() => {
    if (Object.keys(weather).length) {
      const { forecastPeriods } = weather
      const today = moment(new Date()).format('l')

      setValues({
        city: weather.city,
        state: weather.state,
        date: moment(forecastPeriods[0].startTime).format('dddd h:mm A'),
        shortForecast: forecastPeriods[0].shortForecast,
        temp: Math.round(forecastPeriods[0].temperature),
        sunset: moment(new Date(`${today} ${weather.sunset} UTC`)).format('LT'),
        sunrise: moment(new Date(`${today} ${weather.sunrise} UTC`)).format('LT'),
        wind: `${forecastPeriods[0].windSpeed} ${forecastPeriods[0].windDirection}`,
        icon: forecastPeriods[0].icon
      })
    }
  }, [weather])

  return (
    <div className="currentWeather">
      <div className="cw-header" role="button" tabIndex={0} onClick={onOpen} onKeyPress={onOpen}>
        <Typography color="primary" variant="h4">
          {values.city}
          ,&nbsp;
          {values.state}
        </Typography>
        <Typography color="secondary" variant="h6">
          {values.date}
        </Typography>
        <Typography color="secondary" variant="h6" style={{ textTransform: 'capitalize' }}>
          {values.shortForecast}
        </Typography>
      </div>
      <div className="cw-temp">
        <Icon icon={values.icon} fill={theme.palette.primary.main} height={75} width={75} />
        <div style={{ display: 'flex' }}>
          <Typography color="secondary" variant="h3">
            {values.temp}
          </Typography>
          <Typography color="secondary" variant="body1">
            &#8457;
          </Typography>
        </div>
      </div>
      <div className="cw-env">
        <div className="cw-env-item">
          <Typography color="secondary" variant="h6">
            Wind:&nbsp;
          </Typography>
          <Typography color="secondary" variant="h6">
            {values.wind}
          </Typography>
        </div>
        <div className="cw-env-item">
          <Typography color="secondary" variant="h6">
            Sunrise:&nbsp;
          </Typography>
          <Typography color="secondary" variant="h6">
            {values.sunrise}
          </Typography>
        </div>
        <div className="cw-env-item">
          <Typography color="secondary" variant="h6">
            Sunset:&nbsp;
          </Typography>
          <Typography color="secondary" variant="h6">
            {values.sunset}
          </Typography>
        </div>
      </div>
    </div>
  )
}

CurrentWeather.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    forecastPeriods: PropTypes.array
  }).isRequired,
  onOpen: PropTypes.func.isRequired
}

export default CurrentWeather
