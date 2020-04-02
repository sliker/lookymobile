import * as firebase from 'firebase';

import {
  GET_USER_PROFILES,
  GET_USER_PROFILES_SUCCESS,
  GET_USER_PROFILES_ERROR,
} from './userProfilesActionTypes';

const getUserProfiles = () => {
  return {
    type: GET_USER_PROFILES,
  }
};

const getUserProfilesSuccess = (userProfilesList) => {
  return {
    type: GET_USER_PROFILES_SUCCESS,
    payload: userProfilesList,
  }
};

const getUserProfileError = (error) => {
  return {
    type: GET_USER_PROFILES_ERROR,
    payload: error,
  }
};

export const initGetUserProfiles = (userProfilesKeys) => {
  return (dispatch) => {
    const firebaseUserProfilesRef = firebase.app().database().ref(`/users`);
    const userProfilesPromises = [];
    dispatch(getUserProfiles());

    while(userProfilesKeys.length) {
      userProfilesPromises.push(firebaseUserProfilesRef.child(userProfilesKeys.pop()).once('value'));
    }

    return Promise.all(userProfilesPromises)
      .then((snapshots) => {
        const userProfiles = {};
        for(let i = 0; i < snapshots.length; i++) {
          userProfiles[ snapshots[i].key ] = snapshots[i].val();
        }
        return dispatch(getUserProfilesSuccess(userProfiles));
      })
      .catch(error => dispatch(getUserProfileError(error)));
  };
};
