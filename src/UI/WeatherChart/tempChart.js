import React, { useState, useCallback } from 'react'
import moment from 'moment'

import { useTheme } from '@material-ui/core/styles'
import { AreaChart, LabelList, Area, XAxis, ResponsiveContainer } from 'recharts'
import { Store } from '../../Store'

const initialData = [
  {
    name: 'Page A',
    temp: 4000
  },
  {
    name: 'Page B',
    temp: 3000
  },
  {
    name: 'Page C',
    temp: 2000
  },
  {
    name: 'Page D',
    temp: 2780
  },
  {
    name: 'Page E',
    temp: 1890
  },
  {
    name: 'Page F',
    temp: 2390
  },
  {
    name: 'Page G',
    temp: 3490
  }
]

const Chart = () => {
  const theme = useTheme()
  const { primary, secondary } = theme.palette
  const { state } = React.useContext(Store)
  const { weather } = state
  const [data, setData] = useState([...initialData])

  /*
    Set chart data after dom renders and weather data is available. Since we
    receive hourly data, loop through the first 30 entries using 3 hour intervals
  */
  const chartRef = useCallback(node => {
    if (node !== null && Object.keys(weather).length) {
      const { hourlyPeriods } = weather
      const weatherData = []

      for (let i = 0; i < 30; i += 3) {
        weatherData.push({
          name: moment(new Date(hourlyPeriods[i].startTime)).format('h A'),
          temp: Math.round(hourlyPeriods[i].temperature)
        })
      }

      setData([...weatherData])
    }
  }, [weather])

  return (
    <div ref={chartRef} className="wc-chart" style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer width="99%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 0
          }}
        >
          <XAxis dataKey="name" stroke={secondary.main} padding={{ left: 10, right: 10 }} />
          <Area type="monotone" dataKey="temp" stroke={primary.main} fill={primary.main}>
            <LabelList dataKey="temp" position="top" fill={secondary.main} />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
