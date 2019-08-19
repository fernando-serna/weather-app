import React, { useEffect } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen'

import './Header.css'

const header = props => {
  const { refresh, onOpen } = props
  let deferredInstallPrompt = null

  const saveBeforeInstallPromptEvent = evt => {
    // CODELAB: Add code to save event & show the install button.
    deferredInstallPrompt = evt
    // installButton.removeAttribute('hidden')
  }

  const onRefresh = () => {
    const locationsJSON = localStorage.getItem('locations')
    const locations = JSON.parse(locationsJSON)
    refresh(locations)
  }

  const installPWA = evt => {
    // CODELAB: Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt()
    // Hide the install button, it can't be called twice.
    evt.srcElement.setAttribute('hidden', true);
    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice
      .then(choice => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt', choice)
        } else {
          console.log('User dismissed the A2HS prompt', choice)
        }
        deferredInstallPrompt = null
      })
  }

  const logAppInstalled = evt => {
    // CODELAB: Add code to log the event
    console.log('Weather App was installed.', evt);
  }

  // useEffect(() => {
  //   window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent)
  //   window.addEventListener('appinstalled', logAppInstalled)
  // }, [])


  return (
    <header className="header">
      <Button variant="outlined" color="primary" onClick={() => onOpen()}>
        Add City
      </Button>
      <AddToHomeScreenIcon id="butInstall" className="header-home" />
      <RefreshIcon className="header-refresh" onClick={() => onRefresh()} />
    </header>
  )
}

export default header
