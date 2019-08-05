import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { useTheme } from '@material-ui/core/styles'

import { AreaChart, LabelList, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
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

const Example = () => {
  const theme = useTheme()
  const { primary, secondary } = theme.palette
  const { state } = React.useContext(Store)
  const { weather } = state
  const [data, setData] = useState([...initialData])

  useEffect(() => {
    if (Object.keys(weather).length) {
      const { list } = weather
      const weatherData = []

      for (let i = 0; i < 10; i += 1) {
        weatherData.push({
          name: moment(new Date(list[i].dt * 1000)).format('ddd h A'),
          temp: Math.round(list[i].main.temp)
        })
      }

      setData([...weatherData])
    }
  }, [weather])

  return (
    <div className="wc-chart" style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer width="99%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0
          }}
        >
          <XAxis dataKey="name" stroke={secondary.main} padding={{ left: 10, right: 10 }} />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Area type="monotone" dataKey="temp" stroke={primary.main} fill={primary.main}>
            <LabelList dataKey="temp" position="top" fill={secondary.main} />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Example
