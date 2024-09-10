import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../features/sessionSlice'
import userReducer from '../features/userSlice'


export const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch