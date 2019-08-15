import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'

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
    wind: ' ----- ',
    humidity: ' ----- '
  })

  /* Update data on new weather props */
  useEffect(() => {
    console.log({ weather })
    if (Object.keys(weather).length) {
      const { currently, daily } = weather

      setValues({
        city: weather.city,
        state: weather.state,
        date: moment(new Date(currently.time * 1000)).format('dddd h:mm A'),
        shortForecast: currently.summary,
        temp: Math.round(currently.temperature),
        sunset: moment(new Date(daily.data[0].sunsetTime * 1000)).format('LT'),
        sunrise: moment(new Date(daily.data[0].sunriseTime * 1000)).format('LT'),
        wind: currently.windSpeed,
        humidity: currently.humidity,
        icon: currently.icon
      })
    }
  }, [weather])

  return (
    <div className="currentWeather">
      <div className="cw-header" role="button" tabIndex={-1} onClick={onOpen} onKeyPress={onOpen}>
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
      <ClearIcon className="cw-clear" />
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
            Humidity:&nbsp;
          </Typography>
          <Typography color="secondary" variant="h6">
            {values.humidity}
            %
          </Typography>
        </div>
        <div className="cw-env-item">
          <Typography color="secondary" variant="h6">
            Wind:&nbsp;
          </Typography>
          <Typography color="secondary" variant="h6">
            {values.wind}
            &nbsp;mph
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
      <div className="cw-buttons">
        <Button variant="outlined" color="primary">
          Daily
        </Button>
        <Button variant="outlined" color="primary">
          Hourly
        </Button>
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
    hourlyPeriods: PropTypes.array
  }).isRequired,
  onOpen: PropTypes.func.isRequired
}

export default CurrentWeather
