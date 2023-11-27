import {

  RESET_CHECKOUT,
  SET_CHECKOUT_PAYMENT_DETAILS,
  SET_CHECKOUT_SHIPPING_DETAILS,
  SET_CHECKOUT_BASKET_DETAILS,
  SET_ORDER_DETAILS
  
} from 'constants/constants';

export const setOrderDetails = (details) => ({
  type: SET_ORDER_DETAILS,
  payload: details
});

export const setBasketDetails = (details) => ({
  type: SET_CHECKOUT_BASKET_DETAILS,
  payload: details
});

export const setShippingDetails = (details) => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details
});

export const setPaymentDetails = (details) => ({
  type: SET_CHECKOUT_PAYMENT_DETAILS,
  payload: details
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT
});
