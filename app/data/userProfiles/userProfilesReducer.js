import {
  GET_USER_PROFILES,
  GET_USER_PROFILES_SUCCESS,
  GET_USER_PROFILES_ERROR,
} from './userProfilesActionTypes';
import UserProfilesRecord, { profileRecord } from '../../records/userProfilesRecord';

const initialState = UserProfilesRecord();

export default function userProfiles(state = initialState, action = {}) {
  switch (action.type) {
    case GET_USER_PROFILES:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_USER_PROFILES_SUCCESS:
      const items = state.get('items');
      let userProfile;
      const userProfilesList = items.withMutations((userProfilesMap) => {
        Object.keys(action.payload).forEach((key) => {
          userProfile = action.payload[ key ];
          // save on the state only the desired data
          userProfilesMap.set(key, profileRecord({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            displayName: userProfile.displayName,
            profilePictureUrl: userProfile.profilePictureUrl || '',
          }));
        });
      });
      return state
        .set('loading', false)
        .set('error', false)
        .set('items', userProfilesList);
    case GET_USER_PROFILES_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
        .set('errorData', action.payload);
    default:
      return state;
  }
}
