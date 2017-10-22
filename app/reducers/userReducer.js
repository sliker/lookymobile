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
} from '../actions/actionTypes';

const initialState = {
  email: '',
  userId: '',
  loading: false,
  error: false,
  errorMessage: '',
  profile: {
    loading: false,
    error: false,
    displayName: '',
    firstName: '',
    lastName: '',
    folderId: '',
    latitude: '',
    longitude: '',
    provider: '',
    profilePicture: '',
    profilePictureUrl: '',
    pets: {
      found: [],
      lost: [],
    },
  },
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_WITH_EMAIL:
      return Object.assign({}, state, {
        email: action.payload.email,
        loading: true,
        error: false,
      });
    case USER_LOGIN_WITH_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        userId: action.payload.uid,
        email: action.payload.email,
        profile: Object.assign({}, state.profile, {
          profilePictureUrl: action.payload.photoURL,
        })
      });
    case USER_LOGIN_WITH_EMAIL_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        errorData: action.payload,
      });
    case USER_SIGN_UP_WITH_EMAIL:
      return Object.assign({}, state, {
        email: action.payload.email,
        loading: true,
        error: false,
      });
    case USER_SIGN_UP__WITH_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        userId: action.payload.userId,
        loading: false,
        error: false,
      });
    case USER_SIGN_UP__WITH_EMAIL_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      });
    case USER_PROFILE_CREATE:
      const { displayName, firstName, lastName, folderId } = action.payload.profile;
      return {
        ...state,
        profile: Object.assign({}, state.profile, {
          loading: true,
          displayName,
          firstName,
          lastName,
          folderId,
        })
      };
    case USER_PROFILE_CREATE_SUCCESS:
      return {
        ...state,
        profile: Object.assign({}, state.profile, {
          loading: false,
        })
      };
    case USER_PROFILE_CREATE_ERROR:
      return {
        ...state,
        profile: Object.assign({}, state.profile, {
          loading: false,
          error: true,
          errorData: action.payload,
        })
      };
    default:
      return state;
  }
}
