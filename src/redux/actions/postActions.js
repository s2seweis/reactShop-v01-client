import {
 
  ADD_POST,
  ADD_POST_SUCCESS,
  CANCEL_GET_POSTS,
  CLEAR_SEARCH_STATE,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  REMOVE_POST,
  REMOVE_POST_SUCCESS,
  SEARCH_POST,
  SEARCH_POST_SUCCESS

} from 'constants/constants';

export const getPosts = (lastRef) => ({
  type: GET_POSTS,
  payload: lastRef
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts
});

export const cancelGetPosts = () => ({
  type: CANCEL_GET_POSTS
});

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post
});

export const searchPost = (searchKey) => ({
  type: SEARCH_POST,
  payload: {
    searchKey
  }
});

export const searchPostSuccess = (posts) => ({
  type: SEARCH_POST_SUCCESS,
  payload: posts
});

export const clearSearchState = () => ({
  type: CLEAR_SEARCH_STATE
});

export const addPostSuccess = (post) => ({
  type: ADD_POST_SUCCESS,
  payload: post
});

export const removePost = (id) => ({
  type: REMOVE_POST,
  payload: id
});

export const removePostSuccess = (id) => ({
  type: REMOVE_POST_SUCCESS,
  payload: id
});

export const editPost = (id, updates) => ({
  type: EDIT_POST,
  payload: {
    id,
    updates
  }
});

export const editPostSuccess = (updates) => ({
  type: EDIT_POST_SUCCESS,
  payload: updates
});