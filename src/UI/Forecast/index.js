import React, { useState, useCallback, useEffect } from 'react'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import Cloudy from '../../Icons/Cloudy'
import CloudyGusts from '../../Icons/CloudyGusts'
import DaySunny from '../../Icons/DaySunny'
import Hail from '../../Icons/Hail'
import NightClear from '../../Icons/NightClear'
import Rain from '../../Icons/Rain'
import Snow from '../../Icons/Snow'
import Thunderstorm from '../../Icons/Thunderstorm'

import './Forecast.css'

const Forecast = () => {
  const [week, setWeek] = useState([])
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const myRef = useCallback(node => {
    if (node !== null) {
      if (node.offsetHeight <= 150) {
        setHeight(node.offsetHeight)
        setWidth(node.offsetWidth / 4)
      } else {
        setHeight(node.offsetHeight / 4)
        setWidth(node.offsetWidth)
      }
    }
  }, [])

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
