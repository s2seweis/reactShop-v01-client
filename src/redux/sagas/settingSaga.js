import { UPDATE_EMAIL, UPDATE_SETTINGS, ADD_SETTING, GET_SETTING, UPDATE_SETTING } from 'constants/constants';
import { ADMIN_SETTINGS, ADMIN_USERS } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';
import { updateSettingsSuccess } from '../actions/settingActions';
import { addSettingSuccess } from '../actions/settingActions';
import { getSettingSuccess } from '../actions/settingActions';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import { clearProfile, setProfile } from 'redux/actions/profileActions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import defaultAvatar from 'images/defaultAvatar.png';
import defaultBanner from 'images/defaultBanner.jpg';
import 'firebase/firestore';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* settingSaga({ type, payload }) {
  switch (type) {

    case ADD_SETTING: {
      try {
        yield initRequest();
        const { avatarFile, bannerFile } = payload.files;
        yield put(setLoading(true));
        const key = yield call(firebase.generateKey);
        const setting = {
          ...payload,
        };

        if (avatarFile || bannerFile) {
          const bannerURL = yield call(firebase.storeImage, key, 'banner', bannerFile) ;
          const avatarURL = yield call(firebase.storeImage, key, 'avatar', avatarFile) ;
          const settingNew = { avatar: avatarURL, banner: bannerURL, ...payload.adds };
          yield call(firebase.addSetting, key, settingNew);
          yield put(addSettingSuccess(setting));
        } else {
          yield call(firebase.addSetting, key, setting);
        }
        yield handleAction(ADMIN_SETTINGS, 'Settings succesfully added', 'success');
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Setting failed to add: ${e?.message}`, 'error');
      }
      break;
    }
    case UPDATE_SETTING: {
      try {
        const state = yield select();
        const { avatarFile, bannerFile } = payload.files;
        yield put(setLoading(true));

        if (avatarFile || bannerFile) {
          const bannerURL = bannerFile ? yield call(firebase.storeImage, state.auth.id, 'banner', bannerFile) : payload.updates.banner;
          const avatarURL = avatarFile ? yield call(firebase.storeImage, state.auth.id, 'avatar', avatarFile) : payload.updates.avatar;
          const updates = { ...payload.updates, avatar: avatarURL, banner: bannerURL };
          yield call(firebase.updateSetting, state.auth.id, updates);
          yield put(updateSettingsSuccess(updates));
        } else {
          yield call(firebase.updateSetting, state.auth.id, payload.updates);
          yield put(updateSettingsSuccess(payload.updates));
        }

        yield put(setLoading(false));
        yield call(history.push, ADMIN_SETTINGS);
        yield call(displayActionMessage, 'Profile Updated Successfully!', 'success');
      } catch (e) {
        console.log(e);
        yield put(setLoading(false));
        if (e.code === 'auth/wrong-password') {
          yield call(displayActionMessage, 'Wrong password, profile update failed :(', 'error');
        } else {
          yield call(displayActionMessage, `:( Failed to update profile. ${e.message ? e.message : ''}`, 'error');
        }
      }
      break;
    }

    case GET_SETTING:
      try {
        const snapshot = yield call(firebase.docRef);

        if (snapshot.data()) { // if user exists in database
          const test = snapshot.data();
          yield put(getSettingSuccess(test));
        }
      }
      catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;
  }
}

export default settingSaga;