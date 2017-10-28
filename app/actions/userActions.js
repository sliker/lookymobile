import * as firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import { createFolderId } from '../utils/imageUtil';

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

const setUserProfile = (userProfileData) => {
  return {
    type: USER_PROFILE_SET,
    payload: userProfileData,
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

const loginWithSocial = (provider) => {
  return {
    type: USER_LOGIN_SOCIAL,
    payload: provider,
  }
};

const loginWithSocialSuccess = (user, token) => {
  return {
    type: USER_LOGIN_SOCIAL_SUCCESS,
    payload: {
      user,
      token,
    },
  }
};

const loginWithSocialError = (error) => {
  return {
    type: USER_LOGIN_SOCIAL_ERROR,
    payload: error,
  }
};

const loginWithSocialCanceled = () => {
  return {
    type: USER_LOGIN_SOCIAL_CANCELED,
  }
};

export const recoverPasswordReset = () => {
  return {
    type: USER_RECOVER_PASSWORD_RESET,
  }
};

export const initSocialLogin = (provider) => {
  return (dispatch) => {
    dispatch(loginWithSocial(provider));

    const firebaseLogin = (credential, token) => {
      return firebase.app().auth().signInWithCredential(credential)
        .then((user) => {
          dispatch(loginWithSocialSuccess(user, token));
          // check if user has profile
          return firebase.app().database().ref(`/users/${user.uid}`).once('value')
            .then((snapshot) => {
              // if not profile, create one
              if (!snapshot.exists()) {
                const profileData = {
                  displayName: user.displayName,
                  firstName: '',
                  lastName: '',
                  folderId: createFolderId(),
                  provider: provider,
                };
                return dispatch(initCreateProfile(user.uid, profileData));
              }

              // user already has a profile, so set the data to the store
              const profile = snapshot.val();
              const profileData = {
                displayName: profile.displayName,
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                folderId: profile.folderId,
                provider: profile.provider,
              };

              return dispatch(setUserProfile(profileData));
            });
        })
        .catch((error) => dispatch(loginWithSocialError(error)));
    };

    switch(provider) {
      case 'facebook':
        return LoginManager.logInWithReadPermissions(['email'])
          .then((result) => {
            if (result.isCancelled) {
              return dispatch(loginWithSocialCanceled());
            } else {
              // Login successful :D
              AccessToken.getCurrentAccessToken().then((data) => {
                const token = data.accessToken.toString();
                const credential = firebase.auth.FacebookAuthProvider.credential(token);

                if (!credential) {
                  return dispatch(loginWithSocialError('No auth provider'));
                }

                return firebaseLogin(credential, token);

              });
            }
          }, (error) => dispatch(loginWithSocialError(error)));
      case 'google':
        // TODO
        return;
      default:
        return dispatch(loginWithSocialError('No valid login provider'));
    }
  };
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
