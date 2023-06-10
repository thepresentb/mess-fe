import { connectRouter, routerMiddleware } from "connected-react-router";
import { Action, combineReducers } from "redux";
import { history } from "../util/history";
import createSagaMiddleware from 'redux-saga';
import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSage";
import authReducer from "../feature/auth/authSlice";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
})

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
