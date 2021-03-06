import { environmentDefaults } from './environment-defaults';

export const environment = {
  ...environmentDefaults,
  production: true,
  hmr: false,
  firebase: {
    apiKey: '',
    authDomain: 'wedding-2c80b.firebaseapp.com',
    databaseURL: 'https://wedding-2c80b.firebaseio.com',
    projectId: 'wedding-2c80b',
    storageBucket: 'wedding-2c80b.appspot.com',
    messagingSenderId: ''
  }
};
