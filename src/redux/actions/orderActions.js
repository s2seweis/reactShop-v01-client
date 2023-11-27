import {
  
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  CANCEL_GET_ORDERS,
  CLEAR_SEARCH_STATE,
  EDIT_ORDER,
  EDIT_ORDER_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  REMOVE_ORDER,
  REMOVE_ORDER_SUCCESS,  
  SEARCH_ORDER,
  SEARCH_ORDER_SUCCESS

} from 'constants/constants';

export const getOrders = (lastRef) => ({
  type: GET_ORDERS,
  payload: lastRef
});

export const getOrdersSuccess = (orders) => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders
});

export const cancelGetOrders = () => ({
  type: CANCEL_GET_ORDERS
});

export const addOrder= (order) => ({
  type: ADD_ORDER,
  payload: order
});

export const searchOrder = (searchKey) => ({
  type: SEARCH_ORDER,
  payload: {
    searchKey
  }
});

export const searchOrderSuccess = (orders) => ({
  type: SEARCH_ORDER_SUCCESS,
  payload: orders
});

export const clearSearchState = () => ({
  type: CLEAR_SEARCH_STATE
});

export const addOrderSuccess = (order) => ({
  type: ADD_ORDER_SUCCESS,
  payload: order
});

export const removeOrder = (id) => ({
  type: REMOVE_ORDER,
  payload: id
});

export const removeOrderSuccess = (id) => ({
  type: REMOVE_ORDER_SUCCESS,
  payload: id
});

export const editOrder = (id, updates) => ({
  type: EDIT_ORDER,
  payload: {
    id,
    updates
  }
});

export const editOrderSuccess = (updates) => ({
  type: EDIT_ORDER_SUCCESS,
  payload: updates
});