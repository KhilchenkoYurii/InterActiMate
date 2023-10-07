import ApiService from '../../services/api.service';
import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

// TODO: action type
function* fetchUser(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(ApiService.get, `users/${action.data}`);
    const { user } = response.data.data;
    yield put({ type: 'SET_USER', data: user });
  } catch (error) {
    // TODO:
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;