import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import DaySunny from '../../Icons/DaySunny'

import './CurrentWeather.css'

const CurrentWeather = props => {
  const { weather } = props
  const [values, setValues] = useState({
    city: ' ----- ',
    state: ' ----- ',
    date: moment(new Date()).format('dddd h:mm A'),
    description: ' ----- ',
    temp: 0,
    pressure: 0,
    humidity: 0,
    speed: 0
  })

  useEffect(() => {
    console.log('weather updated')
    if (Object.keys(weather).length) {
      setValues({
        city: weather.city,
        state: weather.state,
        date: moment(new Date(weather.dt * 1000)).format('dddd h:mm A'),
        description: weather.weather[0].description,
        temp: Math.round(weather.main.temp),
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        speed: weather.wind.speed
      })
    }
  }, [weather])

  console.log({ weather })

  return (
    <div className="currentWeather">
      <div className="cw-header">
        <Typography color="primary" variant="h4">
          {values.city}
          ,&nbsp;
          {values.state}
        </Typography>
        <Typography color="secondary" variant="h6">
          {values.date}
        </Typography>
        <Typography color="secondary" variant="h6" style={{ textTransform: 'capitalize' }}>
          {values.description}
        </Typography>
      </div>
      <div className="cw-temp">
        <DaySunny fill="orange" height={75} width={75} />
        <div style={{ display: 'flex' }}>
          <Typography color="primary" variant="h3">
            {values.temp}
          </Typography>
          <Typography color="primary" variant="body1">
            &#8457;
          </Typography>
        </div>
      </div>
      <div className="cw-env">
        <Typography color="secondary" variant="h6">
          Pressure:&nbsp;
          {values.pressure}
          &nbsp;atm
        </Typography>
        <Typography color="secondary" variant="h6">
          Humidity:&nbsp;
          {values.humidity}
          &nbsp;%
        </Typography>
        <Typography color="secondary" variant="h6">
          Wind:&nbsp;
          {values.speed}
          &nbsp;mph
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
  }).isRequired
}

export default CurrentWeather
