import { createMuiTheme } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import cyan from '@material-ui/core/colors/cyan'
import blueGrey from '@material-ui/core/colors/blueGrey'

const muiTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: cyan
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: blueGrey[700]
      }
    }
  }
})

export default muiTheme
