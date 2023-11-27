import { 
  CLEAR_INGREDIENTS, 
  SET_INGREDIENT, 
  UPDATE_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT_SUCCESS, 
  ADD_INGREDIENT,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT

} from 'constants/constants';

export default (state = {}, action) => {
  switch (action.type) {

    case GET_INGREDIENT_SUCCESS:
      return { 
        ...state,
        ...action.payload   
      };

    case ADD_INGREDIENT:
      return {
        ...state,
        // setting: action.payload
        ...action.payload
      };

    case ADD_INGREDIENT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case UPDATE_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case CLEAR_INGREDIENTS:
      return {};
    default:
      return state;
  }
};
