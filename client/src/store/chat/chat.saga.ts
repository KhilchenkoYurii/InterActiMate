import { call, put, takeLatest } from 'redux-saga/effects'
import ApiService from '../../services/api.service';
import { AxiosResponse } from 'axios';

interface IChatSagaAction {
  type: string;
  data: any;
};

function* fetchChats(action: IChatSagaAction) {
  try {
    const response: AxiosResponse<any> = yield call(ApiService.get, `chats/${action.data}`);
    const { newChats } = response.data.data;
    yield put({ type: 'SET_CHATS', data: newChats })
  } catch {
    // TODO:
  }
}

function* fetchChat(action: IChatSagaAction) {
  try {
    // TODO:
    // console.log('fetchChat by ID action::', action);
    const response: AxiosResponse<any> = yield call(ApiService.get, `chats/${action.data}`);
    console.log('response::', response);
    const { chat, messages } = response.data.data;
    console.log('response chat::', chat);
    console.log('response messages::', messages);
    yield put({ type: 'SET_CURRENT_CHAT', data: { ...chat, messages } })
  } catch (e) {
    // TODO: error handdling
  }
}

function* chatSaga() {
  yield takeLatest('FETCH_CHATS', fetchChats);
  yield takeLatest('FETCH_CHAT', fetchChat);
}

export default chatSaga