import React from 'react'

import Chart from './tempChart'
import './WeatherChart.css'

const WeatherChart = props => {
  const { weather, height, width, display } = props

  if (height < 600 && width > 600 && !display) {
    return null
  }

  return (
    <div className="weatherChart">
      <Chart weather={weather} display={display} height={height} width={width} />
    </div>
  )
}

export default WeatherChart
