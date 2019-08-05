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
    description: ' ----- ',
    temp: 0,
    pressure: 0,
    humidity: 0,
    speed: 0,
    icon: '',
    shortForecast: ' ----- ',
    detailedForecast: ' ----- ',
  })

  useEffect(() => {
    if (Object.keys(weather).length) {
      const { forecastPeriods } = weather

      setValues({
        city: weather.city,
        state: weather.state,
        date: moment(forecastPeriods[0].startTime).format('dddd h:mm A'),
        shortForecast: forecastPeriods[0].shortForecast,
        detailedForecast: forecastPeriods[0].detailedForecast,
        temp: Math.round(forecastPeriods[0].temperature),
        // pressure: weather.main.pressure,
        // humidity: weather.main.humidity,
        // speed: forecastPeriods[0].windSpeed,
        // icon: weather.weather[0].icon
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
        {/* <Typography color="secondary" variant="h6">
          Pressure:&nbsp;
          {values.pressure}
          &nbsp;atm
        </Typography>
        <Typography color="secondary" variant="h6">
          Humidity:&nbsp;
          {values.humidity}
          &nbsp;%
        </Typography> */}
        <Typography color="secondary" variant="h6">
          {/* Wind:&nbsp; */}
          {values.detailedForecast}
          {/* &nbsp;mph */}
        </Typography>
      </div>
    </div>
  )
}

CurrentWeather.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    dt: PropTypes.number,
    weather: PropTypes.array,
    main: PropTypes.object,
    wind: PropTypes.object
  }).isRequired,
  onOpen: PropTypes.func.isRequired
}

export default CurrentWeather
