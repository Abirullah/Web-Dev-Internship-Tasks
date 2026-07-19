import { configureStore } from '@reduxjs/toolkit'
import phonesReducer from '../features/phones/phoneSlice.js'

export const store = configureStore({
  reducer: {
    phones: phonesReducer,
  },
})
