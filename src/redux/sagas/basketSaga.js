/* eslint-disable indent */
import { CLEAR_BASKET } from 'constants/constants';
import { displayActionMessage } from 'helpers/utils';
import { all, call, put, select} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* basketSaga({ type, payload }) {
  switch (type) 
  
  {
  
    case CLEAR_BASKET: {
      try {
        yield initRequest();
        yield call(firebase.clearBasket, payload);
        // yield put(clearBasketSuccess(payload));
        yield put(setLoading(false));
        yield handleAction(undefined, 'Basket succesfully removed not yet', 'success');
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Basket failed to remove: ${e.message}`, 'error');
      }
      break;
    }
    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default basketSaga;
