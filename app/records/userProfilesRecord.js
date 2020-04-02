import { Record, Map } from 'immutable';

export const profileRecord = Record({
  displayName: '',
  firstName: '',
  lastName: '',
  profilePictureUrl: '',
});

export default UserProfilesRecord = Record({
  loading: false,
  error: false,
  errorData: false,
  items: Map(),
});
