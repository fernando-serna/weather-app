import React from 'react'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import DayCloudy from '../../Icons/DayCloudy'

import './CurrentWeather.css'

const CurrentWeather = () => {
  return (
    <div className="cw-wrapper">
      <div className="cw-header">
        <Typography color="primary" variant="h4">
          Redmond, WA
        </Typography>
        <Typography color="secondary" variant="h6">
          {moment(new Date()).format('dddd h:mm A')}
        </Typography>
        <Typography color="secondary" variant="h6">
          Forecast
        </Typography>
      </div>
      <div className="cw-temp">
        <DayCloudy fill="orange" />
        <div style={{ display: 'flex' }}>
          <Typography color="primary" variant="h1">
            74
          </Typography>
          <Typography color="primary" variant="h4">
            &#8457;
          </Typography>
        </div>
      </div>
      <div className="cw-env">
        <Typography color="secondary" variant="h6">
          Precipitation:
        </Typography>
        <Typography color="secondary" variant="h6">
          Humidity:
        </Typography>
        <Typography color="secondary" variant="h6">
          Wind:
        </Typography>
      </div>
    </div>
  )
}

export default CurrentWeather
