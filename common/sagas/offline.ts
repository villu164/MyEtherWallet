import { delay, SagaIterator } from 'redux-saga';
import {
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
  select
} from 'redux-saga/effects';
import { getWalletBalance } from 'selectors/wallet';
import { getRates } from 'selectors/rates';
import { AppState } from 'reducers';
import { TypeKeys } from 'actions/config/constants';
import {
  toggleOfflineConfig,
  TToggleOfflineConfig,
  changeNode
} from 'actions/config';
import { getConfig } from 'selectors/config';
import { fetchCCRates } from 'actions/rates';
import { getBalances } from 'actions/wallet';

function* putActionWhenNullStateFromSelector(pair) {
  const state = yield select(pair.selector);
  if (state === null) {
    yield put(pair.action());
  }
}

export function* hydrateOnConnected(
  offline: boolean,
  offlineState: boolean
): SagaIterator {
  if (offlineState && !offline) {
    const selectorActionPairs = [
      { selector: getWalletBalance, action: getBalances },
      { selector: getRates, action: fetchCCRates }
    ];
    selectorActionPairs.map(each => putActionWhenNullStateFromSelector(each));
  }
}

export function* pollOfflineStatus(): SagaIterator {
  while (true) {
    const offline = !navigator.onLine;
    const config = yield select(getConfig);
    const offlineState = config.offline;
    yield call(hydrateOnConnected, offline, offlineState);
    if (offline !== offlineState) {
      yield put(toggleOfflineConfig());
    }
    yield call(delay, 250);
  }
}

// Fork our recurring API call, watch for the need to cancel.
function* handlePollOfflineStatus(): SagaIterator {
  const pollOfflineStatusTask = yield fork(pollOfflineStatus);
  yield take('CONFIG_STOP_POLL_OFFLINE_STATE');
  yield cancel(pollOfflineStatusTask);
}

export default function* offlineSaga(): SagaIterator {
  yield takeLatest(
    TypeKeys.CONFIG_POLL_OFFLINE_STATUS,
    handlePollOfflineStatus
  );
}
