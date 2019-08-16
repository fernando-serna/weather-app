import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { Store } from '../../Store'
import './Dialog.css'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.main
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
  }
}))

const DialogTitle = props => {
  const classes = useStyles()
  const { children, onClose } = props

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}

DialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func
}

DialogTitle.defaultProps = {
  onClose: () => { }
}

const DialogContent = props => {
  const styles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }))
  const classes = styles()
  const { children } = props

  return (
    <MuiDialogContent className={classes.root} {...props}>
      {children}
    </MuiDialogContent>
  )
}

DialogContent.propTypes = {
  children: PropTypes.node.isRequired
}

const DialogActions = props => {
  const styles = makeStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1)
    }
  }))
  const classes = styles()
  const { children } = props

  return (
    <MuiDialogActions className={classes.root} {...props}>
      {children}
    </MuiDialogActions>
  )
}

DialogActions.propTypes = {
  children: PropTypes.node.isRequired
}

export const DialogComponent = props => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)
  const { onSubmit, onClose, handleLocation } = props
  const [zip, setZip] = useState(state.currentZip)
  const [error, setError] = useState(false)

  /*
    Check if valid zip, set store zip key and call fetchWeatherFunction again,
    else show error
  */
  const handleSubmit = () => {
    if (zip.toString().length === 5) {
      dispatch({ type: 'SET_ZIP', payload: zip })
      onSubmit(zip)
    } else {
      setError(true)
    }
  }

  /* Clear error whenever active */
  const onChange = e => {
    if (error) setError(false)
    setZip(e.target.value)
  }

  return (
    <Dialog aria-labelledby="dialog" open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="dialog-title" onClose={onClose}>
        Enter Zip Code
      </DialogTitle>
      <DialogContent dividers>
        <div className="dialog-content">
          {/* <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => handleLocation()}
          >
            Get Location
          </Button>
          <p>or</p> */}
          <TextField
            autoFocus
            fullWidth
            error={error}
            helperText={error ? 'Please enter a valid zip code' : null}
            id="zip-field"
            label="Zip Code"
            value={zip}
            onChange={e => onChange(e)}
            type="number"
            margin="normal"
            className={classes.textField}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="secondary" variant="outlined">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DialogComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}
