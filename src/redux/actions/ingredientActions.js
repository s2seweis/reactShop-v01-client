// import { SettingAppliedFilters } from 'components/settings';
import {

  CLEAR_INGREDIENTS,
  SET_INGREDIENT,
  UPDATE_EMAIL,
  UPDATE_INGREDIENT,
  UPDATE_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  ADD_INGREDIENT_SUCCESS,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT

} from 'constants/constants';

export const clearIngredients = () => ({
  type: CLEAR_INGREDIENTS
});

// now here, loading the settings 

// export const setSetting = (setting) => ({
//   type: SET_SETTING,
//   payload: setting
// });

export const updateEmail = (password, newEmail) => ({
  type: UPDATE_EMAIL,
  payload: {
    password,
    newEmail
  }
});

export const addIngredients = (ingredients) => ({
  type: ADD_INGREDIENT,
  payload: ingredients
});

// export const addSettings = (settings) => ({
//   type: ADD_SETTING,
//   payload: {
//     settings: settings.settings,
//     files: settings.files,
//   }
// });

export const addIngredientSuccess = (ingredients) => ({
  type: ADD_INGREDIENT_SUCCESS,
  payload: ingredients
});

export const getIngredient = (ingredients) => ({
  type: GET_INGREDIENT,
  payload: ingredients
});

export const getIngredientSuccess = (ingredients) => ({
  type: GET_INGREDIENT_SUCCESS,
  payload: ingredients
});

export const updateIngredient = (newIngredients) => ({
  type: UPDATE_INGREDIENT,
  payload: {
    updates: newIngredients.updates,
    files: newIngredients.files,
    // credentials: newSettings.credentials
  }
});

export const updateIngredientsSuccess = (updates) => ({
  type: UPDATE_INGREDIENTS_SUCCESS,
  payload: updates
});