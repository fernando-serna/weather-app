import React from 'react'

import Cloud from '../Icons/Cloud'
import Cloudy from '../Icons/Cloudy'
import DayCloudy from '../Icons/DayCloudy'
import DaySunny from '../Icons/DaySunny'
import NightCloudy from '../Icons/NightCloudy'
import NightClear from '../Icons/NightClear'
import Showers from '../Icons/Showers'
import Rain from '../Icons/Rain'
import Thunderstorm from '../Icons/Thunderstorm'
import Snow from '../Icons/Snow'
import Fog from '../Icons/Fog'

export const IconComponent = props => {
  const { icon } = props

  if (icon === '01d' || icon === '01n') return <DaySunny {...props} />
  if (icon === '02d') return <DayCloudy {...props} />
  if (icon === '02n') return <NightCloudy {...props} />
  if (icon === '03d' || icon === '03n') return <Cloud {...props} />
  if (icon === '04d' || icon === '04n') return <Cloudy {...props} />
  if (icon === '09d' || icon === '09n') return <Showers {...props} />
  if (icon === '10d' || icon === '10n') return <Rain {...props} />
  if (icon === '11d' || icon === '11n') return <Thunderstorm {...props} />
  if (icon === '13d' || icon === '13n') return <Snow {...props} />
  if (icon === '50d' || icon === '50n') return <Fog {...props} />

  return <Cloudy {...props} />
}
