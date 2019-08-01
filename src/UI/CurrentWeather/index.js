import React, { useState, useCallback } from 'react'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import DayCloudy from '../../Icons/DayCloudy'

import './CurrentWeather.css'

const CurrentWeather = () => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const myRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight / 2)
      setWidth(node.offsetWidth / 2)
    }
  }, [])

  return (
    <div className="currentWeather">
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
      <div ref={myRef} className="cw-temp">
        {height && width ? (
          <DayCloudy fill="orange" height={height} width={width} />
        ) : null}
        <div style={{ display: 'flex' }}>
          <Typography color="primary" variant="h3">
            74
          </Typography>
          <Typography color="primary" variant="body1">
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
