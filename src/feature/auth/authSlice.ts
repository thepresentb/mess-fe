import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../typing/model/User';

export interface AuthState {
  isLoggedIn: boolean,
  logging?: boolean,
  errors: string,
  currentUser?: User,
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  errors: '',
  currentUser: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string; }>) {
      state.logging = true
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false
      state.isLoggedIn = true
      state.errors = ''
      state.currentUser = action.payload
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false
      state.errors = action.payload
    },

    logout(state) {
      state.errors = ''
      state.logging = false
      state.isLoggedIn = false
      state.currentUser = undefined
    },
  }
})

export const authAction = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
