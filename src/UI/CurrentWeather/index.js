import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'

import { Store } from '../../Store'
import WeatherChart from '../WeatherChart'
import Forecast from '../Forecast'
import { IconComponent as Icon } from '../utils'
import './CurrentWeather.css'

const CurrentWeather = props => {
  const theme = useTheme()
  const { state, dispatch } = useContext(Store)
  const { height, width } = state
  const { weather } = props
  const [values, setValues] = useState({
    city: ' ----- ',
    state: ' ----- ',
    zip: '',
    date: moment(new Date()).format('dddd h:mm A'),
    temp: 0,
    icon: '',
    shortForecast: ' ----- ',
    sunrise: ' ----- ',
    sunset: ' ----- ',
    wind: ' ----- ',
    humidity: ' ----- '
  })
  const [chart, setChart] = useState(false)

  const handleFooter = () => {
    if (width < 600) {
      return <Forecast weather={weather} height={height} width={width} />
    }
    if (chart) {
      return <WeatherChart weather={weather} />
    }
    return <Forecast weather={weather} height={height} width={width} />
  }

  /* Update data on new weather props */
  useEffect(() => {
    if (Object.keys(weather).length) {
      const { currently, daily } = weather

      setValues({
        city: weather.city,
        state: weather.state,
        zip: weather.zip,
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
          {values.shortForecast}
        </Typography>
      </div>
      <ClearIcon className="cw-clear" onClick={() => props.onDelete(values.zip)} />
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
        <Button variant="outlined" color="primary" onClick={() => setChart(false)}>
          Daily
        </Button>
        <Button variant="outlined" color="primary" onClick={() => setChart(true)}>
          Hourly
        </Button>
      </div>
      <div className="cw-footer">
        {handleFooter()}
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
  }).isRequired
}

export default CurrentWeather
