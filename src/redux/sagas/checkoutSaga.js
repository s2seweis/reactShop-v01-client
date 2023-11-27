import { SET_ORDER_DETAILS } from 'constants/constants';
import { HOME} from 'constants/routes';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import firebase from 'services/firebase';
import {all, call, put, select} from 'redux-saga/effects';
import { displayActionMessage } from 'helpers/utils';
import PropType from 'prop-types';
import { history } from 'routers/AppRouter';
import { clearBasket } from 'redux/actions/basketActions';

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* checkoutSaga({ type, payload }) {
  switch (type) {
    case SET_ORDER_DETAILS: {
      try {
        // yield initRequest();

        const key = yield call(firebase.generateKey);
        
        const order = {
          ...payload,
          instance: key
        };

        yield call(firebase.addOrder, key, order);

        // yield put(placeOrderSuccess({
        //   id: key,
        //   ...order
        // }));

        yield handleAction(HOME, 'Order succesfully added', 'success');
        yield put(clearBasket());
        // yield call(firebase.saveBasketItems(basket, firebase.auth.currentUser.uid));

        yield put(setLoading(false));
        // yield call(history.push, SHOP)
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Order failed to add: ${e?.message}`, 'error');
      }
      break;
    }
  }
}

export default checkoutSaga;