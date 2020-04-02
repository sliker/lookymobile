import * as firebase from 'firebase';
import GeoFire from 'geofire';

import {
  GET_NEARBY_LOST_PETS,
  GET_NEARBY_LOST_PETS_SUCCESS,
  GET_NEARBY_LOST_PETS_ERROR,
} from './petsActionTypes';
import { initGetUserProfiles } from '../userProfiles/userProfilesActions';

const getNearbyLostPets = () => {
  return {
    type: GET_NEARBY_LOST_PETS,
  }
};

const getBatchOfNearbyLostPetsSuccess = (petList) => {
  return {
    type: GET_NEARBY_LOST_PETS_SUCCESS,
    payload: petList,
  }
};

const getNearbyLostPetsError = (error) => {
  return {
    type: GET_NEARBY_LOST_PETS_ERROR,
    payload: error,
  }
};

const fetchBatchListOfPets = (dispatch, petKeys, typeOfReport) => {
  const firebasePetRef = firebase.app().database().ref(`/pets/${typeOfReport}`);
  const petsPromise = [];
  const pets = [];
  while(petKeys.length) {
    petsPromise.push(firebasePetRef.child(petKeys.pop()).once('value'));
  }
  return Promise.all(petsPromise)
    .then((snapshots) => {
      const userProfilesKeys = [];
      let pet;
      for(let i = 0; i < snapshots.length; i++) {
        pet = snapshots[i].val();
        pet.key = snapshots[i].key;
        pets.push(pet);
        if (!userProfilesKeys.includes(pet.uid)) {
          userProfilesKeys.push(pet.uid);
        }
      }

      dispatch(initGetUserProfiles(userProfilesKeys));
      return dispatch(getBatchOfNearbyLostPetsSuccess(pets));
    })
    .catch(error => dispatch(getNearbyLostPetsError(error)));
};

export const fetchNearbyPets = (typeOfReport) => {
  return (dispatch, getState) => {
    const state = getState();
    const userLat = state.getIn([ 'user', 'profile', 'latitude' ]);
    const userLong = state.getIn([ 'user', 'profile', 'longitude' ]);
    const petKeys = [];
    const geoRef = firebase.app().database().ref().child(`/_geo/${typeOfReport}`);
    const geoFire = new GeoFire(geoRef);
    dispatch(getNearbyLostPets());

    if (!userLat || !userLong) {
      return dispatch(getNearbyLostPetsError('No lat or long available'));
    }

    const geoQuery = geoFire.query({
      center: [ userLat, userLong ],
      radius: 15
    });

    geoQuery.on('key_entered', (key) => {
      petKeys.push(key);
    });
    geoQuery.on('ready', () => {
      geoQuery.cancel();

      return fetchBatchListOfPets(dispatch, petKeys, typeOfReport);
    });
  };
};
