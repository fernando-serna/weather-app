import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen'

import './Header.css'

function header() {
  return (
    <header className="header">
      {/* <div />
      <AddToHomeScreenIcon className="header-home" />
      <RefreshIcon className="header-refresh" /> */}
    </header>
  )
}

export default header
