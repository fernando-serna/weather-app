import React from 'react'

import Chart from './tempChart'
import './WeatherChart.css'

const WeatherChart = props => {
  const { weather, height, width } = props
  return (
    <div className="weatherChart">
      <Chart weather={props.weather} height={height} width={width} />
    </div>
  )
}

export default WeatherChart
