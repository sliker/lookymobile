import { Record, List } from 'immutable';

const userPets = Record({
  found: List(),
  lost: List(),
});

export default ProfileRecord = Record({
  loading: false,
  error: false,
  displayName: '',
  firstName: '',
  lastName: '',
  folderId: '',
  latitude: 0,
  longitude: 0,
  provider: '',
  profilePictureUrl: '',
  pets: userPets,
}, 'ProfileRecord');
