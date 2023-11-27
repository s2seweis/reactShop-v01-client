import {

  ADD_USER_SUCCESS,
  CLEAR_SEARCH_STATE, 
  EDIT_USER_SUCCESS,
  GET_USERS_SUCCESS, 
  REMOVE_USER_SUCCESS,
  SEARCH_USER_SUCCESS
  
} from 'constants/constants';

const initState = {
  lastRefKey: null,
  total: 0,
  items: []
};

export default (state = {
  lastRefKey: null,
  total: 0,
  items: [],
  searchedUsers: initState
}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.users]
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchedUsers: {
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [...state.searchedUsers.items, ...action.payload.users]
        }
      };
    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        searchedUsers: initState
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        items: state.items.filter((user) => user.id !== action.payload)
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              ...action.payload.updates
            };
          }
          return user;
        })
      };
    default:
      return state;
  }
};

// okay
