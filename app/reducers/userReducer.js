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
} from '../actions/actionTypes';

const initialState = {
  token: '',
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
    profilePictureUrl: '',
    pets: {
      found: [],
      lost: [],
    },
  },
  recoverPassword: {
    success: false,
    error: false,
  },
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SOCIAL:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        profile: Object.assign({}, state.profile, {
          provider: action.payload,
        })
      });
    case USER_LOGIN_SOCIAL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        token: action.payload.token,
        userId: action.payload.user.uid,
        email: action.payload.user.email,
        profile: Object.assign({}, state.profile, {
          profilePictureUrl: action.payload.user.photoURL,
        })
      });
    case USER_LOGIN_SOCIAL_CANCELED:
      return Object.assign({}, state, {
        loading: false,
        error: false,
      });
    case USER_LOGIN_WITH_EMAIL:
      return Object.assign({}, state, {
        email: action.payload.email,
        loading: true,
        error: false,
      });
    case USER_SET_DATA_ALREADY_LOGIN:
    case USER_LOGIN_WITH_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        userId: action.payload.uid,
        email: action.payload.email,
      });
    case USER_LOGIN_SOCIAL_ERROR:
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
      const { displayName, firstName, lastName, folderId, provider, profilePictureUrl } = action.payload.profile;
      return {
        ...state,
        profile: Object.assign({}, state.profile, {
          loading: true,
          displayName,
          firstName,
          lastName,
          folderId,
          provider,
          profilePictureUrl,
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
    case USER_SIGN_OUT_SUCCESS:
      return Object.assign({}, state , {
        email: '',
        token: '',
        userId: '',
        signOutError: false,
        profile: Object.assign({}),
      });
    case USER_SIGN_OUT_ERROR:
      return Object.assign({}, state, {
        signOutError: true,
        errorData: action.payload,
      });
    case USER_PROFILE_SET:
      return (() => {
        const { displayName, firstName, lastName, folderId, provider, profilePictureUrl } = action.payload;
        return {
          ...state,
          profile: Object.assign({}, state.profile, {
            displayName,
            firstName,
            lastName,
            folderId,
            provider,
            profilePictureUrl,
          })
        };
      })();
    case USER_RECOVER_PASSWORD:
      return Object.assign({}, state, {
        error: false,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: false,
          error: false,
        })
      });
    case USER_RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: true,
          error: false,
        })
      };
    case USER_RECOVER_PASSWORD_ERROR:
      return {
        ...state,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: false,
          error: true,
          errorData: action.payload,
        })
      };
    case USER_RECOVER_PASSWORD_RESET:
      return {
        ...state,
        recoverPassword: Object.assign({}, state.recoverPassword, {
          success: false,
          error: false,
        })
      };
    case USER_SET_LOCATION:
      return {
        ...state,
        profile: Object.assign({}, state.profile, {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        })
      };
    default:
      return state;
  }
}
