import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'


interface SessionState {
  session: boolean
}

const initialState: SessionState = {
  session: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state: SessionState, action: PayloadAction<boolean>) => {
      state.session = action.payload
    },
  },
})

export const {setSession} = sessionSlice.actions

export const selectSession = (state: RootState) => state.session

export default sessionSlice.reducer