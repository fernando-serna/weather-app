import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const Store = createContext()

const initialState = {
  weather: {},
  currentZip: 98007
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return { ...state, weather: action.payload }
    case 'SET_ZIP':
      return { ...state, currentZip: action.payload }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
}
