import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import { StoreProvider } from './Store'
import App from './UI/App'
import muiTheme from './Theme'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

serviceWorker.register()
