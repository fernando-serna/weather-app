import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import DayCloudy from '../../Icons/DayCloudy'

import './CurrentWeather.css'

const CurrentWeather = props => {
  const { weather } = props
  console.log({ weather })

  return (
    <div className="currentWeather">
      <div className="cw-header">
        <Typography color="primary" variant="h4">
          {weather.name}
        </Typography>
        <Typography color="secondary" variant="h6">
          {moment(new Date(weather.dt * 1000)).format('dddd h:mm A')}
        </Typography>
        <Typography color="secondary" variant="h6">
          {weather.weather[0].description}
        </Typography>
      </div>
      <div className="cw-temp">
        <DayCloudy fill="orange" height={75} width={75} />
        <div style={{ display: 'flex' }}>
          <Typography color="primary" variant="h3">
            {weather.main.temp}
          </Typography>
          <Typography color="primary" variant="body1">
            &#8457;
          </Typography>
        </div>
      </div>
      <div className="cw-env">
        <Typography color="secondary" variant="h6">
          Presser:&nbsp;
          {weather.main.pressure}
          &nbsp;atm
        </Typography>
        <Typography color="secondary" variant="h6">
          Humidity:&nbsp;
          {weather.main.humidity}
          &nbsp;%
        </Typography>
        <Typography color="secondary" variant="h6">
          Wind:&nbsp;
          {weather.wind.speed}
          &nbsp;mph
        </Typography>
      </div>
    </div>
  )
}

CurrentWeather.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string,
    dt: PropTypes.number,
    weather: PropTypes.array,
    main: PropTypes.object,
    wind: PropTypes.object
  }).isRequired
}

export default CurrentWeather
