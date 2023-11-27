import * as ACTION from 'constants/constants';
import { takeLatest } from 'redux-saga/effects';
import authSaga from './authSaga';
import productSaga from './productSaga';
import settingSaga from './settingSaga';
import ingredientSaga from './ingredientSaga';
import orderSaga from './orderSaga';
import postSaga from './postSaga';
import userSaga from './userSaga';
import checkoutSaga from './checkoutSaga';
import profileSaga from './profileSaga';
import basketSaga from './basketSaga';

function* rootSaga() {
  yield takeLatest([
    ACTION.SIGNIN,
    ACTION.SIGNUP,
    ACTION.SIGNUP_SUCCESS,
    ACTION.SIGNOUT,
    ACTION.SIGNIN_WITH_GOOGLE,
    ACTION.SIGNIN_WITH_FACEBOOK,
    ACTION.SIGNIN_WITH_GITHUB,
    ACTION.ON_AUTHSTATE_CHANGED,
    ACTION.ON_AUTHSTATE_SUCCESS,
    ACTION.ON_AUTHSTATE_FAIL,
    ACTION.SET_AUTH_PERSISTENCE,
    ACTION.RESET_PASSWORD
  ], authSaga);

  yield takeLatest([
    ACTION.ADD_PRODUCT,
    ACTION.SEARCH_PRODUCT,
    ACTION.REMOVE_PRODUCT,
    ACTION.EDIT_PRODUCT,
    ACTION.GET_PRODUCTS
  ], productSaga);

  yield takeLatest([
    ACTION.SET_ORDER_DETAILS,
    ACTION.SET_CHECKOUT_BASKET_DETAILS,
    ACTION.SET_CHECKOUT_SHIPPING_DETAILS,
    ACTION.SET_CHECKOUT_PAYMENT_DETAILS,
    ACTION.RESET_CHECKOUT
  ], checkoutSaga);

  yield takeLatest([
    ACTION.ADD_ORDER,
    ACTION.SEARCH_ORDER,
    ACTION.REMOVE_ORDER,
    ACTION.EDIT_ORDER,
    ACTION.GET_ORDERS
  ], orderSaga);

  yield takeLatest([
    ACTION.ADD_POST,
    ACTION.SEARCH_POST,
    ACTION.REMOVE_POST,
    ACTION.EDIT_POST,
    ACTION.GET_POSTS
  ], postSaga);

  yield takeLatest([
    ACTION.ADD_USER,
    ACTION.SEARCH_USER,
    ACTION.REMOVE_USER,
    ACTION.EDIT_USER,
    ACTION.GET_USERS
  ], userSaga);

  yield takeLatest([
    ACTION.UPDATE_EMAIL,
    ACTION.UPDATE_PROFILE
  ], profileSaga);

  yield takeLatest([
    ACTION.UPDATE_EMAIL,
    ACTION.UPDATE_SETTING,
    ACTION.ADD_SETTING,
    ACTION.GET_SETTING,
  ], settingSaga);

  yield takeLatest([
    ACTION.UPDATE_EMAIL,
    ACTION.UPDATE_INGREDIENT,
    ACTION.ADD_INGREDIENT,
    ACTION.GET_INGREDIENT,
  ], ingredientSaga);

  yield takeLatest([
    ACTION.CLEAR_BASKET
  ], basketSaga);
}

export default rootSaga;