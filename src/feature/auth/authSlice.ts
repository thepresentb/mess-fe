import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../api/typing/responsive/AuthRes';
import { LoginPayload } from '../../api/typing/payload/LoginPayload';
import { RegisterPayload } from '../../api/typing/payload/RegisterPayload';

export interface AuthState {
  isSuccess: boolean,
  isLogging?: boolean,
  status: number | undefined,
  currentUser?: User,
}

const initialState: AuthState = {
  isSuccess: false,
  isLogging: false,
  status: undefined,
  currentUser: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLogging = true
    },

    register(state, action: PayloadAction<RegisterPayload>) {
      state.isLogging = true
    },

    authSuccess(state, action: PayloadAction<User>) {
      state.isLogging = false
      state.isSuccess = true
      state.status = undefined
      state.currentUser = action.payload
    },

    authFailed(state, action: PayloadAction<number>) {
      state.isLogging = false
      state.status = action.payload
    },

    logout(state) {
      state.status = undefined
      state.isLogging = false
      state.isSuccess = false
      state.currentUser = undefined
    },
  }
})

export const authAction = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
