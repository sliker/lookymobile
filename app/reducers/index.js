import { combineReducers } from 'redux-immutable'

import user from '../data/user/userReducer';
import pets from '../data/pets/petsReducer';
import userProfiles from '../data/userProfiles/userProfilesReducer';

export default combineReducers({
  user,
  pets,
  userProfiles,
});
