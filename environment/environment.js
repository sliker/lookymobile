import { Platform } from 'react-native';

export const environment = {
  prod: {
    firebase: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
    },
    oauthClient: {
      iosClientId: '',
    },
  },
  dev: {
    firebase: {
      apiKey: '',
      authDomain: 'aclopus-dev.firebaseapp.com',
      databaseURL: 'https://aclopus-dev.firebaseio.com',
      projectId: 'aclopus-dev',
      storageBucket: 'aclopus-dev.appspot.com',
    },
    oauthClient: {
      iosClientId: '',
    },
  },
};
