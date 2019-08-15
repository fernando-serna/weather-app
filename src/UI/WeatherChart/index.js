import React from 'react'

import Chart from './tempChart'
import './WeatherChart.css'

const WeatherChart = props => (
  <div className="weatherChart">
    <Chart weather={props.weather} />
  </div>
)

export default WeatherChart
