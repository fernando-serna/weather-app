import React, { useState, useEffect } from 'react'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import Cloudy from '../../Icons/Cloudy'

import './Forecast.css'

const Forecast = () => {
  const [week, setWeek] = useState([])

  // Hard coded array for days of the week
  useEffect(() => {
    const days = ['Today']
    const day = new Date()

    for (let i = 1; i < 7; i += 1) {
      days.push(
        moment(day)
          .add(i, 'days')
          .format('dddd')
      )
    }

    setWeek(days)
  }, [])

  return (
    <div className="forecast">
      {week.map(day => (
        <div key={day} className="forecast-item">
          <div className="forecast-day">
            <Typography color="secondary" variant="body1">
              {day}
            </Typography>
          </div>
          <div className="forecast-icon">
            <Cloudy fill="orange" height={64} width={64} />
          </div>
          <div className="forecast-temp">
            <Typography color="secondary" variant="body1">
              73&deg; | 58&deg;
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Forecast
