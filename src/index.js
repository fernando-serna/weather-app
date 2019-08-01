import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import App from './UI/App'
import muiTheme from './Theme'

ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
