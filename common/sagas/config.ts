import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { NODES } from 'config/data';
import { getNodeConfig, getConfig } from 'selectors/config';
import { AppState } from 'reducers';
import { TypeKeys } from 'actions/config/constants';
import {
  toggleOfflineConfig,
  TToggleOfflineConfig,
  changeNode
} from 'actions/config';

// @HACK For now we reload the app when doing a language swap to force non-connected
// data to reload. Also the use of timeout to avoid using additional actions for now.
function* reload(): SagaIterator {
  setTimeout(() => location.reload(), 250);
}

function* handleNodeChangeIntent(action): SagaIterator {
  const nodeConfig = yield select(getNodeConfig);
  const currentNetwork = nodeConfig.network;
  const actionNetwork = NODES[action.payload].network;
  yield put(changeNode(action.payload));
  if (currentNetwork !== actionNetwork) {
    yield call(reload);
  }
}

export default function* configSaga(): SagaIterator {
  yield takeEvery(TypeKeys.CONFIG_NODE_CHANGE_INTENT, handleNodeChangeIntent);
  yield takeEvery(TypeKeys.CONFIG_LANGUAGE_CHANGE, reload);
}
