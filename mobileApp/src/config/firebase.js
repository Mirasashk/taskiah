import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

firebase.setReactNativeAsyncStorage(AsyncStorage);

const myAuth = auth();
const db = firestore();
const myStorage = storage();

// Connect to emulators in development
if (__DEV__) {
  console.log('Connecting to emulators');
  myStorage.useEmulator('10.0.2.2', 9199);
  myAuth.useEmulator('http://localhost:9099');
  // Connect to Firestore emulator
  db.useEmulator('10.0.2.2', 8082);
}

export {myAuth, db, myStorage};
