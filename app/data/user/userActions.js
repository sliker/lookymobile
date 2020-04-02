import * as firebase from 'firebase';
import GeoFire from 'geofire';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

import { createFolderId } from '../../utils/imageUtil';
import { environment } from '../../../environment/environment';

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

export const signOutSuccess = () => {
  return {
    type: USER_SIGN_OUT_SUCCESS,
  }
};

export const signOutError = (error) => {
  return {
    type: USER_SIGN_OUT_ERROR,
    payload: error,
  }
};

const setDataAlreadyLogin = (user) => {
  return {
    type: USER_SET_DATA_ALREADY_LOGIN,
    payload: user,
  }
};

const setUserLocation = (location) => {
  return {
    type: USER_SET_LOCATION,
    payload: location,
  }
};

const firebaseUserProfile = (user, provider, dispatch) => {
  // check if user has profile
  return firebase.app().database().ref(`/users/${user.uid}`).once('value')
    .then((snapshot) => {
      // if not profile, create one
      if (!snapshot.exists()) {
        const profileData = {
          displayName: user.displayName,
          firstName: user.displayName,
          lastName: '',
          folderId: createFolderId(),
          provider: provider,
          profilePictureUrl: user.photoURL,
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
        profilePictureUrl: profile.profilePictureUrl,
      };

      dispatch(initSetUserLocation());
      return dispatch(setUserProfile(profileData));
    });
};

const setUserLocationOnFirebase = (userId, location) => {
  const userUpdates = {
    latitude: location.latitude,
    longitude: location.longitude,
  };
  const databaseRef = firebase.app().database().ref();
  const geoRef = databaseRef.child('/_geo/users');
  const geoFire = new GeoFire(geoRef);
  geoFire.set(userId, [location.latitude, location.longitude])
    .catch((error) => {
      // TODO handle errors, save log on Firebase
    });

  return databaseRef.child(`/users/${userId}`).update(userUpdates);
};

export const initSocialLogin = (provider) => {
  return (dispatch) => {
    dispatch(loginWithSocial(provider));

    const firebaseLogin = (credential, token) => {
      return firebase.app().auth().signInWithCredential(credential)
        .then((user) => {
          dispatch(loginWithSocialSuccess(user, token));
          return firebaseUserProfile(user, provider, dispatch);
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
              // Facebook Login successful :D
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
        return GoogleSignin.hasPlayServices({ autoResolve: true })
          .then(() => {
            GoogleSignin.configure({
              iosClientId: __DEV__ ? environment.dev.oauthClient.iosClientId : environment.prod.oauthClient.iosClientId,
            })
              .then(() => {
                GoogleSignin.signIn()
                  .then((user) => {
                    // Google Login successful :D
                    const token = user.idToken;
                    const credential = firebase.auth.GoogleAuthProvider.credential(token);

                    if (!credential || !token) {
                      return dispatch(loginWithSocialError('No auth provider or not token'));
                    }

                    return firebaseLogin(credential, token);
                  })
                  .catch(error => dispatch(loginWithSocialError(error)));
              })
              .catch(error => dispatch(loginWithSocialError(error)));
        })
          .catch(error => dispatch(loginWithSocialError(error)));
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
      .then((user) => {
        firebaseUserProfile(user, 'password', dispatch);
        return dispatch(loginWithEmailSuccess(user))
      })
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
          profilePictureUrl: '',
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
        profilePictureUrl: userProfileData.profilePictureUrl,
      })
      .then(() => {
        dispatch(initSetUserLocation());
        return dispatch(createProfileSuccess())
      })
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

export const initSignOut = () => {
  return (dispatch, getState) => {
    const state = getState();
    const auth = firebase.app().auth();
    const providerId = state.getIn([ 'user', 'profile', 'provider']);
    return auth.signOut()
      .then(() => {
        if (providerId === 'google') {
          GoogleSignin.signOut();
        } else if (providerId === 'facebook') {
          LoginManager.logOut();
        }
        return dispatch(signOutSuccess());
      })
      .catch(error => dispatch(signOutError(error)));
  };
};

export const initSetDataAlreadyLogin = (user) => {
  return (dispatch, getState) => {
    const userState = getState().get('user');
    // check if not profile set
    if (!userState.get('profile').displayName) {
      dispatch(setDataAlreadyLogin(user));
      return firebaseUserProfile(user, user.providerId, dispatch);
    }

    return userState;
  };
};

const initSetUserLocation = () => {
  return (dispatch, getState) => {
    return navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      };
      const userId = getState().get('user').userId;
      dispatch(setUserLocation(location));

      return setUserLocationOnFirebase(userId, location);
    }, (error) => {
      // TODO: dispatch action with error
      console.log('-- location error --', error);
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 900000 /* 15 minutes */ });
  };
};
