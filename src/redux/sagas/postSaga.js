/* eslint-disable indent */
import {
  ADD_POST,
  EDIT_POST,
  GET_POSTS,
  REMOVE_POST,
  SEARCH_POST
} from 'constants/constants';
import { ADMIN_POSTS } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import {
  all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';
import {
  addPostSuccess,
  clearSearchState, editPostSuccess, getPostsSuccess,
  removePostSuccess,
  searchPostSuccess
} from '../actions/postActions';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch posts'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* postSaga({ type, payload }) {
  switch (type) {
    case GET_POSTS:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getPosts, payload);

        if (result.posts.length === 0) {
          handleError('No items found.');
        } else {
          yield put(getPostsSuccess({
            posts: result.posts,
            lastKey: result.lastKey ? result.lastKey : state.posts.lastRefKey,
            total: result.total ? result.total : state.posts.total
          }));
          yield put(setRequestStatus(''));
        }
        // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;

    case ADD_POST: {
      try {
        yield initRequest();

        const { imageCollection } = payload;
        const key3 = yield call(firebase.generateKey3);
        const key2 = yield call(firebase.generateKey2);
        const key1 = yield call(firebase.generateKey1);
        const downloadURL3 = yield call(firebase.storeImage3, key3, 'posts', payload.image3 );
        const downloadURL2 = yield call(firebase.storeImage2, key2, 'posts', payload.image2 );
        const downloadURL1 = yield call(firebase.storeImage1, key1, 'posts', payload.image1 );
        const image3 = { id3: key3, url: downloadURL3 };
        const image2 = { id2: key2, url: downloadURL2 };
        const image1 = { id1: key1, url: downloadURL1 };
        let images = [];

        if (imageCollection.length !== 0) {
          const imageKeys = yield all(imageCollection.map(() => firebase.generateKey2));
          const imageUrls = yield all(imageCollection.map((img, i) => firebase.storeImage2(imageKeys[i](), 'posts', img.file2)));
          images = imageUrls.map((url, i) => ({
            id2: imageKeys[i](),
            url
          }));
        }
      
        const post = {
          ...payload,
          image1: downloadURL1,
          image2: downloadURL2,
          image3: downloadURL3,
          imageCollection: [image2, image1, image3, ...images]
        };

        yield call(firebase.addPost, key2, post);
        yield put(addPostSuccess({
          id2: key2,
          ...post
        }));
        yield handleAction(ADMIN_POSTS, 'Item succesfully added', 'success');
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Item failed to add: ${e?.message}`, 'error');
      }
      break;
    }
    case EDIT_POST: {
      try {
        yield initRequest();

        const { image, imageCollection } = payload.updates;
        let newUpdates = { ...payload.updates };

        if (image.constructor === File && typeof image === 'object') {
          try {
            yield call(firebase.deleteImage, payload.id);
          } catch (e) {
            console.error('Failed to delete image ', e);
          }
          const url = yield call(firebase.storeImage, payload.id, 'posts', image);
          newUpdates = { ...newUpdates, image: url };
        }

        if (imageCollection.length > 1) {
          const existingUploads = [];
          const newUploads = [];

          imageCollection.forEach((img) => {
            if (img.file) {
              newUploads.push(img);
            } else {
              existingUploads.push(img);
            }
          });

          const imageKeys = yield all(newUploads.map(() => firebase.generateKey));
          const imageUrls = yield all(newUploads.map((img, i) => firebase.storeImage(imageKeys[i](), 'posts', img.file)));
          const images = imageUrls.map((url, i) => ({
            id: imageKeys[i](),
            url
          }));
          newUpdates = { ...newUpdates, imageCollection: [...existingUploads, ...images] };
        } else {
          newUpdates = {
            ...newUpdates,
            imageCollection: [{ id: new Date().getTime(), url: newUpdates.image }]
          };
          // add image thumbnail to image collection from newUpdates to
          // make sure you're adding the url not the file object.
        }

        yield call(firebase.editPost, payload.id, newUpdates);
        yield put(editPostSuccess({
          id: payload.id,
          updates: newUpdates
        }));
        yield handleAction(ADMIN_POSTS, 'Item succesfully edited', 'success');
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Item failed to edit: ${e.message}`, 'error');
      }
      break;
    }
    case REMOVE_POST: {
      try {
        yield initRequest();
        yield call(firebase.removePost, payload);
        yield put(removePostSuccess(payload));
        yield put(setLoading(false));
        yield handleAction(ADMIN_POSTS, 'Item succesfully removed', 'success');
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
      }
      break;
    }
    case SEARCH_POST: {
      try {
        yield initRequest();
        // clear search data
        yield put(clearSearchState());

        const state = yield select();
        const result = yield call(firebase.searchPosts, payload.searchKey);

        if (result.posts.length === 0) {
          yield handleError({ message: 'No post found.' });
          yield put(clearSearchState());
        } else {
          yield put(searchPostSuccess({
            posts: result.posts,
            lastKey: result.lastKey ? result.lastKey : state.posts.searchedPosts.lastRefKey,
            total: result.total ? result.total : state.posts.searchedPosts.total
          }));
          yield put(setRequestStatus(''));
        }
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
      }
      break;
    }
    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default postSaga;