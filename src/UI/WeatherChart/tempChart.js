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

const Chart = props => {
  const theme = useTheme()
  const { primary, secondary } = theme.palette
  // const { state } = React.useContext(Store)
  const { weather } = props
  const [data, setData] = useState([...initialData])

  /*
    Set chart data after dom renders and weather data is available. Since we
    receive hourly data, loop through the first 30 entries using 3 hour intervals
  */
  const chartRef = useCallback(node => {
    console.log({ node, weather })
    if (node !== null && Object.keys(weather).length) {
      const { data } = weather.hourly
      const weatherData = []

      for (let i = 0; i <= 12; i += 1) {
        weatherData.push({
          name: moment(new Date(data[i].time * 1000)).format('h A'),
          temp: Math.round(data[i].temperature)
        })
      }



      setData([...weatherData])
    }
  }, [weather])

  return (
    <div ref={chartRef} className="wc-chart" style={{ width: '100%', height: 125 }}>
      <ResponsiveContainer width="99%">
        <AreaChart
          width={500}
          height={125}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 0
          }}
        >
          <XAxis
            dataKey="name"
            stroke={secondary.main}
            padding={{ left: 10, right: 10 }}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <Area type="monotone" dataKey="temp" stroke={primary.main} fill={primary.main}>
            <LabelList dataKey="temp" position="top" fill={secondary.main} />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
