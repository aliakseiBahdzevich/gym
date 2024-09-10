import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { User } from '../../api'


interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: {
    email: '',
    name: '',
    surname: '',
    birthday: '',
    gender: ''
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})

export const {setUser} = userSlice.actions

export const selectSession = (state: RootState) => state.session

export default userSlice.reducer