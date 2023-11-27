import { UPDATE_EMAIL, UPDATE_INGREDIENTS, ADD_INGREDIENT, GET_INGREDIENT, UPDATE_INGREDIENT } from 'constants/constants';
import { ADMIN_INGREDIENTS, ADMIN_USERS} from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';
import { updateIngredientsSuccess } from '../actions/ingredientActions';
import { addIngredientSuccess } from '../actions/ingredientActions';
import { getIngredientSuccess } from '../actions/ingredientActions';
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

function* ingredientSaga({ type, payload }) {
  switch (type) {

    case ADD_INGREDIENT: {
      try {
        yield initRequest();
        const { avatarFile, bannerFile } = payload.files;
        yield put(setLoading(true));
        const key = yield call(firebase.generateKey);
        const ingredient = {
          ...payload,
        };

        if (avatarFile || bannerFile) {
          const bannerURL = yield call(firebase.storeImage, key, 'banner', bannerFile) ;
          const avatarURL = yield call(firebase.storeImage, key, 'avatar', avatarFile) ;
          const ingredientNew = { avatar: avatarURL, banner: bannerURL, ...payload.adds };

          yield call(firebase.addIngredient, key, ingredientNew);
          yield put(addIngredientSuccess(ingredient));
        } else {
          yield call(firebase.addIngredient, key, ingredient);
        }
        
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Ingredient failed to add: ${e?.message}`, 'error');
      }
      break;
    }

    case UPDATE_INGREDIENT: {
      try {
        const state = yield select();
        const { avatarFile, bannerFile } = payload.files;
        yield put(setLoading(true));

        if (avatarFile || bannerFile) {
          const bannerURL = bannerFile ? yield call(firebase.storeImage, state.auth.id, 'banner', bannerFile) : payload.updates.banner;
          const avatarURL = avatarFile ? yield call(firebase.storeImage, state.auth.id, 'avatar', avatarFile) : payload.updates.avatar;
          const updates = { ...payload.updates, avatar: avatarURL, banner: bannerURL };

          yield call(firebase.updateIngredient, state.auth.id, updates);
          yield put(updateIngredientsSuccess(updates));
        } else {

          // this part working
          yield call(firebase.updateIngredient, state.auth.id, payload.updates);
          yield put(updateIngredientsSuccess(payload.updates));
        }

        yield put(setLoading(false));
        // yield call(history.push, ADMIN_INGREDIENTS);
        yield call(displayActionMessage, 'Ingredients Updated Successfully!', 'success');
      } catch (e) {
        console.log(e);
        yield put(setLoading(false));
        if (e.code === 'auth/wrong-password') {
          yield call(displayActionMessage, 'Wrong password, ingredient update failed :(', 'error');
        } else {
          yield call(displayActionMessage, `:( Failed to update ingredient. ${e.message ? e.message : ''}`, 'error');
        }
      }
      break;
    }

    case GET_INGREDIENT:
      try {
        const snapshot = yield call(firebase.docRef1);

        if (snapshot.data()) { // if user exists in database
          const test = snapshot.data();

          yield put(getIngredientSuccess(test));
        }
      }

      catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;
  }
}

export default ingredientSaga;