import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

import Alien from '../Icons/Alien'
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

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  }
}))

export const CircularProgressComponent = () => {
  const classes = useStyles()

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        opacity: 0.5
      }}
    >
      <LinearProgress className={classes.root} />
    </div>
  )
}

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
    if (icon.includes('few') || icon.includes('sct') || icon.includes('bkn') || icon.includes('ovc')) {
      return <DayCloudy {...props} />
    }
    return <DaySunny {...props} />
  }

  if (icon.includes('night')) {
    if (icon.includes('few') || icon.includes('sct') || icon.includes('bkn') || icon.includes('ovc')) {
      return <NightCloudy {...props} />
    }
    return <NightClear {...props} />
  }

  return <Alien {...props} />
}

IconComponent.propTypes = {
  icon: PropTypes.string
}

IconComponent.defaultProps = {
  icon: ''
}
