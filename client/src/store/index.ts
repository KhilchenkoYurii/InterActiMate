import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { chat } from './chat/chat.reducer';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
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
