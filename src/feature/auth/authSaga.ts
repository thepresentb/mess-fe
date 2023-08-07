import { call, fork, put, take } from "redux-saga/effects";
import { authAction } from "./authSlice";
import { push } from "connected-react-router";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "../../api/typing/payload/LoginPayload";
import { authApi } from "../../api/authApi";
import { setToken } from "../../util/auth";
import { AuthRes } from "../../api/typing/responsive/AuthRes";
import { RegisterPayload } from "../../api/typing/payload/RegisterPayload";

function* handleLogin() {
  try {
    let loggedIn = false;
    while (!loggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authAction.login.type)
      let response: AuthRes = yield call(authApi.login, action.payload)
      if (response?.statusCode !== 200) {
        yield put(authAction.authFailed(response.statusCode));
      } else {
        setToken(response.data.accessToken);
        if (response.data.user) {
          yield put(authAction.authSuccess(response.data.user))
        }
        yield put(push('/chat'))
        loggedIn = true;
      }
    }
  } catch (e) {
    yield put(authAction.authFailed(500));
  }
}

function* handleRegister() {
  try {
    let loggedIn = false;
    while (!loggedIn) {
      const action: PayloadAction<RegisterPayload> = yield take(authAction.register.type)
      let response: AuthRes = yield call(authApi.register, action.payload)
      if (response?.statusCode !== 200) {
        yield put(authAction.authFailed(response.statusCode));
      } else {
        yield put(authAction.authFailed(406));
        loggedIn = true;
      }
    }
  } catch (e) {
    yield put(authAction.authFailed(500));
  }
}

function* handleLogout() {
  localStorage.removeItem('auth');
  yield put(push('/login'))
}


function* listenLoginFlow() {
  while (true) {
    yield fork(handleLogin)
    yield take(authAction.logout.type)
    yield call(handleLogout)
  }
}

function* listenRegisterFlow() {
  while (true) {
    yield fork(handleRegister)
    yield take(authAction.logout.type)
    yield call(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(listenLoginFlow)
  yield fork(listenRegisterFlow)
}
