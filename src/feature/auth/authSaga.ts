import { call, fork, put, take } from "redux-saga/effects";
import { authAction } from "./authSlice";
import { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "../../typing/payload/loginPayload";
import { authApi } from "../../api/authApi";

function* handleLogin() {
  try {
    let loggedIn = false;
    while (!loggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authAction.login.type)
      let response: AxiosResponse = yield call(authApi.login, action.payload)
      if (response?.data?.statusbar === 'error') {
        yield put(authAction.loginFailed(response.data.message))
      } else {
        localStorage.setItem('token', response.data.accessToken)
        yield put(authAction.loginSuccess({ username: response?.data.username }))
        yield put(push('/chat'))
        loggedIn = true;
      }
    }
  } catch (e) {
  }
}

function* handleLogout() {
  console.log('logged out')
  localStorage.removeItem('token');
  yield put(push('/login'))
}


function* listenLoginFlow() {
  while (true) {
    yield fork(handleLogin)
    yield take(authAction.logout.type)
    yield call(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(listenLoginFlow)
}
