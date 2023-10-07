import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { user } from './user/user.reducer';
import { chat } from './chat/chat.reducer';
import createSagaMiddleware from 'redux-saga';
import chatSaga from './chat/chat.saga';
import { all } from 'redux-saga/effects';
import userSaga from './user/user.saga';

const rootReducer = combineReducers({
  user,
  chat
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      // # remove the two check nullifiers below later before merging to qa
      immutableCheck: false,
      serializableCheck: false,
    }).prepend(sagaMiddleware),
});

function * rootSaga() {
  yield all([
    userSaga(),
    chatSaga(),
  ])
}

sagaMiddleware.run(rootSaga)
