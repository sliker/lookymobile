import * as firebase from 'firebase';

import { createFolderId } from '../utils/imageUtil';

import {
  USER_LOGIN_WITH_EMAIL,
  USER_LOGIN_WITH_EMAIL_SUCCESS,
  USER_LOGIN_WITH_EMAIL_ERROR,
  USER_SIGN_UP_WITH_EMAIL,
  USER_SIGN_UP__WITH_EMAIL_SUCCESS,
  USER_SIGN_UP__WITH_EMAIL_ERROR,
  USER_PROFILE_CREATE,
  USER_PROFILE_CREATE_SUCCESS,
  USER_PROFILE_CREATE_ERROR,
  USER_RECOVER_PASSWORD,
  USER_RECOVER_PASSWORD_SUCCESS,
  USER_RECOVER_PASSWORD_ERROR,
  USER_RECOVER_PASSWORD_RESET,
} from './actionTypes';

const loginWithEmail = (email) => {
  return {
    type: USER_LOGIN_WITH_EMAIL,
    payload: {
      email,
    }
  }
};

const loginWithEmailSuccess = (user) => {
  return {
    type: USER_LOGIN_WITH_EMAIL_SUCCESS,
    payload: user,
  }
};

const loginWithEmailError = (error) => {
  return {
    type: USER_LOGIN_WITH_EMAIL_ERROR,
    payload: error,
  }
};

const signUpUserWithEmail = (userData) => {
  return {
    type: USER_SIGN_UP_WITH_EMAIL,
    payload: userData,
  }
};

const signUpUserWithEmailSuccess = (userId) => {
  return {
    type: USER_SIGN_UP__WITH_EMAIL_SUCCESS,
    payload: {
      userId
    },
  }
};

const signUpUserWithEmailError = (error) => {
  return {
    type: USER_SIGN_UP__WITH_EMAIL_ERROR,
    payload: error,
  }
};

const createProfile = (userProfileData) => {
  return {
    type: USER_PROFILE_CREATE,
    payload: {
      profile: userProfileData,
    }
  }
};

const createProfileSuccess = () => {
  return {
    type: USER_PROFILE_CREATE_SUCCESS,
  }
};

const createProfileError = (error) => {
  return {
    type: USER_PROFILE_CREATE_ERROR,
    payload: error,
  }
};

const recoverPassword = () => {
  return {
    type: USER_RECOVER_PASSWORD,
  }
};

const recoverPasswordSuccess = () => {
  return {
    type: USER_RECOVER_PASSWORD_SUCCESS,
  }
};

const recoverPasswordError = (error) => {
  return {
    type: USER_RECOVER_PASSWORD_ERROR,
    payload: error,
  }
};

export const recoverPasswordReset = () => {
  return {
    type: USER_RECOVER_PASSWORD_RESET,
  }
};

export const initLoginWithEmail = (email, password) => {
  return (dispatch) => {
    const auth = firebase.app().auth();
    dispatch(loginWithEmail(email));
    return auth.signInWithEmailAndPassword(email, password)
      .then((user) => dispatch(loginWithEmailSuccess(user)))
      .catch(error => dispatch(loginWithEmailError(error)));
  };
};

export const initSignUpUserWithEmail = (userData) => {
  return (dispatch) => {
    const auth = firebase.app().auth();
    dispatch(signUpUserWithEmail(userData));
    return auth.createUserWithEmailAndPassword(userData.email, userData.password)
      .then((user) => {
        const profileData = {
          displayName: `${userData.firstName} ${userData.lastName}`.trim(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          folderId: createFolderId(),
          provider: 'password',
        };

        dispatch(signUpUserWithEmailSuccess(user.uid));
        return dispatch(initCreateProfile(user.uid, profileData));
      })
      .catch(error => dispatch(signUpUserWithEmailError(error)));
  };
};

export const initCreateProfile = (userId, userProfileData) => {
  return (dispatch) => {
    dispatch(createProfile(userProfileData));
    return firebase.app().database().ref(`/users/${userId}`)
      .set({
        displayName: userProfileData.displayName,
        firstName: userProfileData.firstName,
        lastName: userProfileData.lastName,
        folderId: userProfileData.folderId,
        provider: userProfileData.provider,
      })
      .then(() => dispatch(createProfileSuccess()))
      .catch(error => dispatch(createProfileError(error)));
  };
};

export const initRecoverPassword = (email) => {
  return (dispatch) => {
    dispatch(recoverPassword());
    return firebase.app().auth().sendPasswordResetEmail(email)
      .then(() => dispatch(recoverPasswordSuccess()))
      .catch(error => dispatch(recoverPasswordError(error)))
  };
};
