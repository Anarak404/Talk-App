import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

const tokenKey = 'fcmToken';

export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

export const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem(tokenKey);
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      await AsyncStorage.setItem(tokenKey, fcmToken);
    }
  }
  return fcmToken;
};

const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    getToken();
  } catch (e) {
    console.log('Permission rejected');
  }
};
