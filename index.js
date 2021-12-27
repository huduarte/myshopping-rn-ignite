import { registerRootComponent } from 'expo';

import App from './App';

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
// if (__DEV__) {
//   firestore().useEmulator('192.168.1.102', 8080);
// }

// const db = firestore();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
