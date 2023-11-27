// import { SettingAppliedFilters } from 'components/settings';
import {

  CLEAR_SETTINGS,
  SET_SETTING,
  UPDATE_EMAIL,
  UPDATE_SETTING,
  UPDATE_SETTINGS_SUCCESS,
  ADD_SETTING,
  ADD_SETTING_SUCCESS,
  GET_SETTING_SUCCESS,
  GET_SETTING

} from 'constants/constants';

export const clearSettings = () => ({
  type: CLEAR_SETTINGS
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


export const addSettings = (settings) => ({
  type: ADD_SETTING,
  payload: settings
});

// export const addSettings = (settings) => ({
//   type: ADD_SETTING,
//   payload: {
//     settings: settings.settings,
//     files: settings.files,
//   }
// });

export const addSettingSuccess = (settings) => ({
  type: ADD_SETTING_SUCCESS,
  payload: settings
});

export const getSetting = (settings) => ({
  type: GET_SETTING,
  payload: settings
});

export const getSettingSuccess = (settings) => ({
  type: GET_SETTING_SUCCESS,
  payload: settings
});

export const updateSetting = (newSettings) => ({
  type: UPDATE_SETTING,
  payload: {
    updates: newSettings.updates,
    files: newSettings.files,
    // credentials: newSettings.credentials
  }
});

export const updateSettingsSuccess = (updates) => ({
  type: UPDATE_SETTINGS_SUCCESS,
  payload: updates
});