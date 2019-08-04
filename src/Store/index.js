import React, { createContext, useReducer } from 'react'

export const Store = createContext()

const initialState = {
  weather: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return { ...state, weather: action.payload }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
