import { combineReducers } from '@reduxjs/toolkit'
import authTokenReducer from './slices/authTokenSlice'


const rootReducer = combineReducers({
  authToken: authTokenReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer