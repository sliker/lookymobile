import { fromJS } from 'immutable';

import {
  USER_LOGIN_SOCIAL,
  USER_LOGIN_SOCIAL_SUCCESS,
  USER_LOGIN_SOCIAL_ERROR,
  USER_LOGIN_SOCIAL_CANCELED,
  USER_LOGIN_WITH_EMAIL,
  USER_LOGIN_WITH_EMAIL_SUCCESS,
  USER_LOGIN_WITH_EMAIL_ERROR,
  USER_SIGN_UP_WITH_EMAIL,
  USER_SIGN_UP__WITH_EMAIL_SUCCESS,
  USER_SIGN_UP__WITH_EMAIL_ERROR,
  USER_PROFILE_CREATE,
  USER_PROFILE_CREATE_SUCCESS,
  USER_PROFILE_CREATE_ERROR,
  USER_PROFILE_SET,
  USER_RECOVER_PASSWORD,
  USER_RECOVER_PASSWORD_SUCCESS,
  USER_RECOVER_PASSWORD_ERROR,
  USER_RECOVER_PASSWORD_RESET,
  USER_SET_DATA_ALREADY_LOGIN,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_OUT_ERROR,
  USER_SET_LOCATION,
} from './userActionTypes';
import UserRecord from '../../records/userRecord';
import ProfileRecord from '../../records/profileRecord';

const initialState = UserRecord();

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SOCIAL:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn([ 'profile', 'provider' ], action.payload);

      /* return Object.assign({}, state, {
        loading: true,
        error: false,
        profile: Object.assign({}, state.profile, {
          provider: action.payload,
        })
      }); */
    case USER_LOGIN_SOCIAL_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('token', action.payload.token)
        .set('userId', action.payload.user.uid)
        .set('email', action.payload.user.email)
        .setIn([ 'profile', 'profilePictureUrl' ], action.payload.user.photoURL);

      /* return Object.assign({}, state, {
        loading: false,
        error: false,
        token: action.payload.token,
        userId: action.payload.user.uid,
        email: action.payload.user.email,
        profile: Object.assign({}, state.profile, {
          profilePictureUrl: action.payload.user.photoURL,
        })
      }); */
    case USER_LOGIN_SOCIAL_CANCELED:
      return state
        .set('loading', false)
        .set('error', false);

      /* return Object.assign({}, state, {
        loading: false,
        error: false,
      }); */
    case USER_LOGIN_WITH_EMAIL:
      return state
        .set('email', action.payload.email)
        .set('loading', true)
        .set('error', false)
        .setIn([ 'profile', 'provider' ], 'password');

      /* return Object.assign({}, state, {
        email: action.payload.email,
        loading: true,
        error: false,
      }); */
    case USER_SET_DATA_ALREADY_LOGIN:
    case USER_LOGIN_WITH_EMAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('userId', action.payload.uid)
        .set('email', action.payload.email);

      /* return Object.assign({}, state, {
        loading: false,
        error: false,
        userId: action.payload.uid,
        email: action.payload.email,
      }); */
    case USER_LOGIN_SOCIAL_ERROR:
    case USER_LOGIN_WITH_EMAIL_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
        .set('errorMessage', action.payload);

      /* return Object.assign({}, state, {
        loading: false,
        error: true,
        errorData: action.payload,
      }); */
    case USER_SIGN_UP_WITH_EMAIL:
      return state
        .set('email', action.payload.email)
        .set('loading', true)
        .set('error', false)
        .setIn([ 'profile', 'provider' ], 'password');

      /* return Object.assign({}, state, {
        email: action.payload.email,
        loading: true,
        error: false,
      }); */
    case USER_SIGN_UP__WITH_EMAIL_SUCCESS:
      return state
        .set('userId', action.payload.userId)
        .set('loading', false)
        .set('error', false);

      /* return Object.assign({}, state, {
        userId: action.payload.userId,
        loading: false,
        error: false,
      }); */
    case USER_SIGN_UP__WITH_EMAIL_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
        .set('errorCode', action.payload.code)
        .set('errorMessage', action.payload.message);

      /* return Object.assign({}, state, {
        loading: false,
        error: true,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      }); */
    case USER_PROFILE_CREATE:
      const { displayName, firstName, lastName, folderId, provider, profilePictureUrl } = action.payload.profile;
      const newProfile = {
        loading: true,
        displayName,
        firstName,
        lastName,
        folderId,
        provider,
        profilePictureUrl,
      };
      return state.set('profile', fromJS(newProfile));

      /* return {
        ...state,
        profile: Object.assign({}, state.profile, {
          loading: true,
          displayName,
          firstName,
          lastName,
          folderId,
          provider,
          profilePictureUrl,
        })
      }; */
    case USER_PROFILE_CREATE_SUCCESS:
      return state.setIn([ 'profile', 'loading' ], false);

      /* return {
        ...state,
        profile: Object.assign({}, state.profile, {
          loading: false,
        })
      }; */
    case USER_PROFILE_CREATE_ERROR:
      return state
        .get('profile')
        .set('loading', false)
        .set('error', true)
        .set('errorData', action.payload);

      /* return {
        ...state,
        profile: Object.assign({}, state.profile, {
          loading: false,
          error: true,
          errorData: action.payload,
        })
      }; */
    case USER_SIGN_OUT_SUCCESS:
      return state
        .set('email', '')
        .set('token', '')
        .set('userId', '')
        .set('signOutError', '')
        .set('profile', ProfileRecord());

      /* return Object.assign({}, state , {
        email: '',
        token: '',
        userId: '',
        signOutError: false,
        profile: Object.assign({}),
      }); */
    case USER_SIGN_OUT_ERROR:
      return state
        .set('signOutError', true)
        .set('errorData', action.payload);

      /* return Object.assign({}, state, {
        signOutError: true,
        errorData: action.payload,
      }); */
    case USER_PROFILE_SET:
      return (() => {
        const { displayName, firstName, lastName, folderId, provider, profilePictureUrl } = action.payload;
        const newProfile = state
          .get('profile')
          .set('displayName', displayName)
          .set('firstName', firstName)
          .set('lastName', lastName)
          .set('folderId', folderId)
          .set('provider', provider)
          .set('profilePictureUrl', profilePictureUrl);
        return state.set('profile', newProfile);

        /* return {
          ...state,
          profile: Object.assign({}, state.profile, {
            displayName,
            firstName,
            lastName,
            folderId,
            provider,
            profilePictureUrl,
          })
        }; */
      })();
    case USER_RECOVER_PASSWORD:
      return state
        .set('error', false)
        .set('recoverPassword', fromJS({
          success: false,
          error: false,
        }));

      /* return Object.assign({}, state, {
        error: false,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: false,
          error: false,
        })
      }); */
    case USER_RECOVER_PASSWORD_SUCCESS:
      return state.set('recoverPassword', fromJS({
        success: true,
        error: false,
      }));

      /* return {
        ...state,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: true,
          error: false,
        })
      }; */
    case USER_RECOVER_PASSWORD_ERROR:
      return state.set('recoverPassword', fromJS({
        success: false,
        error: true,
        errorData: action.payload,
      }));

      /* return {
        ...state,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: false,
          error: true,
          errorData: action.payload,
        })
      }; */
    case USER_RECOVER_PASSWORD_RESET:
      return state.set('recoverPassword', fromJS({
        success: false,
        error: false,
      }));

      /* return {
        ...state,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: false,
          error: false,
        })
      }; */
    case USER_SET_LOCATION:
      return (() => {
        const newProfile = state
          .get('profile')
          .set('latitude', action.payload.latitude)
          .set('longitude', action.payload.longitude);

        return state.set('profile', newProfile);
      })();

      /* return {
        ...state,
        profile: Object.assign({}, state.profile, {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        })
      }; */
    default:
      return state;
  }
}
