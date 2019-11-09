import React from 'react'
import PropTypes from 'prop-types'

import Alien from '../Icons/Alien'
import { ReactComponent as ClearDay } from '../Icons/clear-day.svg'
import { ReactComponent as ClearNight } from '../Icons/clear-night.svg'
import { ReactComponent as Cloudy } from '../Icons/cloudy.svg'
import { ReactComponent as Fog } from '../Icons/fog.svg'
import { ReactComponent as Hail } from '../Icons/hail.svg'
import { ReactComponent as PartlyCloudyDay } from '../Icons/partly-cloudy-day.svg'
import { ReactComponent as PartlyCloudyNight } from '../Icons/partly-cloudy-night.svg'
import { ReactComponent as Rain } from '../Icons/rain.svg'
import { ReactComponent as Sleet } from '../Icons/sleet.svg'
import { ReactComponent as Snow } from '../Icons/snow.svg'
import { ReactComponent as Thunderstorm } from '../Icons/thunderstorm.svg'
import { ReactComponent as Tornado } from '../Icons/tornado.svg'
import { ReactComponent as Wind } from '../Icons/wind.svg'


export const IconComponent = props => {
  const { icon } = props

  const components = {
    'clear-day': ClearDay,
    'clear-night': ClearNight,
    cloudy: Cloudy,
    fog: Fog,
    hail: Hail,
    'partly-cloudy-day': PartlyCloudyDay,
    'partly-cloudy-night': PartlyCloudyNight,
    rain: Rain,
    sleet: Sleet,
    snow: Snow,
    thunderstorm: Thunderstorm,
    tornado: Tornado,
    wind: Wind
  }

  if (Object.keys(components).includes(icon)) {
    const Icon = components[icon]
    return <Icon />
  }

  return <Alien {...props} />
}

IconComponent.propTypes = {
  icon: PropTypes.string
}

IconComponent.defaultProps = {
  icon: ''
}
