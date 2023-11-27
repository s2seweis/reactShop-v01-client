import { 
  
  CLEAR_SETTINGS, 
  SET_SETTING, 
  UPDATE_SETTINGS_SUCCESS,
  ADD_SETTING_SUCCESS, 
  ADD_SETTING,
  GET_SETTING_SUCCESS,
  GET_SETTING

} from 'constants/constants';

export default (state = {}, action) => {
  switch (action.type) {

    case GET_SETTING_SUCCESS:
      return { 
        ...state,
        ...action.payload   
      };

    case ADD_SETTING:
      return {
        ...state,
        // setting: action.payload
        ...action.payload
      };

    case ADD_SETTING_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case CLEAR_SETTINGS:
      return {};
    default:
      return state;
  }
};
