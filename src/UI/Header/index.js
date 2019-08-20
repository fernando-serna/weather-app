import React from 'react'

import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'

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
      <RefreshIcon className="header-refresh" onClick={() => onRefresh()} />
    </header>
  )
}

export default header
