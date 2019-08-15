import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const Store = createContext()

const initialState = {
  weather: {},
  currentZip: 98007,
  height: null,
  width: null,
  cities: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CITIES':
      return { ...state, cities: [...action.payload] }
    case 'SET_DIMENSIONS':
      return { ...state, width: action.payload.width, height: action.payload.height }
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
