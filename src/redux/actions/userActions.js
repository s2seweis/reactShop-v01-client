import {
 
  ADD_USER,
  ADD_USER_SUCCESS,
  CANCEL_GET_USERS,
  CLEAR_SEARCH_STATE,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  GET_USERS,
  GET_USERS_SUCCESS,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  SEARCH_USER,
  SEARCH_USER_SUCCESS

} from 'constants/constants';

export const getUsers = (lastRef) => ({
  type: GET_USERS,
  payload: lastRef
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const cancelGetUsers = () => ({
  type: CANCEL_GET_USERS
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const searchUser = (searchKey) => ({
  type: SEARCH_USER,
  payload: {
    searchKey
  }
});

export const searchUserSuccess = (users) => ({
  type: SEARCH_USER_SUCCESS,
  payload: users
});

export const clearSearchState = () => ({
  type: CLEAR_SEARCH_STATE
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user
});

export const removeUser = (id) => ({
  type: REMOVE_USER,
  payload: id
});

export const removeUserSuccess = (id) => ({
  type: REMOVE_USER_SUCCESS,
  payload: id
});

export const editUser = (id, updates) => ({
  type: EDIT_USER,
  payload: {
    id,
    updates
  }
});

export const editUserSuccess = (updates) => ({
  type: EDIT_USER_SUCCESS,
  payload: updates
});