import React from 'react'
import PropTypes from 'prop-types'

import Alien from '../Icons/Alien'
import Cloud from '../Icons/Cloud'
import Cloudy from '../Icons/Cloudy'
import CloudyGusts from '../Icons/CloudyGusts'
import DayCloudy from '../Icons/DayCloudy'
import DaySunny from '../Icons/DaySunny'
import Fog from '../Icons/Fog'
import Hail from '../Icons/Hail'
import NightClear from '../Icons/NightClear'
import NightCloudy from '../Icons/NightCloudy'
import Rain from '../Icons/Rain'
import RainMix from '../Icons/RainMix'
import Showers from '../Icons/Showers'
import Smoke from '../Icons/Smoke'
import Snow from '../Icons/Snow'
import Thunderstorm from '../Icons/Thunderstorm'

export const IconComponent = props => {
  const { icon } = props

  if (icon.includes('wind')) return <CloudyGusts {...props} />
  if (icon.includes('rain_snow') || icon.includes('sleet')) return <RainMix {...props} />
  if (icon.includes('frza')) return <Hail {...props} />
  if (icon.includes('showers')) return <Showers {...props} />
  if (icon.includes('thunderstorm')) return <Thunderstorm {...props} />
  if (icon.includes('smoke')) return <Smoke {...props} />
  if (icon.includes('fog') || icon.includes('haze')) return <Fog {...props} />
  if (icon.includes('snow')) return <Snow {...props} />
  if (icon.includes('rain')) return <Rain {...props} />

  if (icon.includes('day')) {
    if (icon.includes('skc')) return <DaySunny {...props} />
    if (icon.includes('few') || icon.icon('sct') || icon.includes('bkn') || icon.includes('ovc')) {
      return <DayCloudy {...props} />
    }
  }

  if (icon.includes('night')) {
    if (icon.includes('skc')) return <NightClear {...props} />
    if (icon.includes('few') || icon.icon('sct') || icon.includes('bkn') || icon.includes('ovc')) {
      return <NightCloudy {...props} />
    }
  }

  return <Alien {...props} />
}

IconComponent.propTypes = {
  icon: PropTypes.string
}

IconComponent.defaultProps = {
  icon: ''
}
