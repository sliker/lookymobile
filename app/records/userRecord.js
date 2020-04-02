import { Record } from 'immutable';

import ProfileRecord from './profileRecord';

const RecoverPasswordRecord = Record({
  success: false,
  error: false,
  errorData: '',
});

export default UserRecord = Record({
  token: '',
  email: '',
  userId: '',
  loading: false,
  error: false,
  errorData: '',
  errorMessage: '',
  errorCode: '',
  profile: ProfileRecord(),
  recoverPassword: RecoverPasswordRecord(),
  signOutError: false,
}, 'UserRecord');
