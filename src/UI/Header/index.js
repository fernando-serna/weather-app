import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen'

import './Header.css'

const header = props => {
  const { refresh, onOpen } = props

  const onRefresh = () => {
    const locationsJSON = localStorage.getItem('locations')
    const locations = JSON.parse(locationsJSON)
    refresh(locations)
  }

  return (
    <header className="header">
      <Button variant="outlined" color="primary" onClick={() => onOpen()}>
        Add City
      </Button>
      <AddToHomeScreenIcon className="header-home" />
      <RefreshIcon className="header-refresh" onClick={() => onRefresh()} />
    </header>
  )
}

export default header
