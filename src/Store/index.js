import React, { createContext, useReducer } from 'react'

export const Store = createContext()

const initialState = {
  currentWeather: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_CURRENT_WEATHER':
      return { ...state, currentWeather: action.payload }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
