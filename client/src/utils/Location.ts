import { PermissionsAndroid, Platform } from 'react-native';
import {
  GeoCoordinates,
  GeoPosition,
  getCurrentPosition,
} from 'react-native-geolocation-service';

const hasLocationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  return false;
};

export const getPosition = async (): Promise<GeoCoordinates> => {
  const hasPermission = await hasLocationPermission();

  return new Promise((resolve, reject) => {
    if (!hasPermission) {
      reject('No permission');
      return;
    }

    getCurrentPosition(
      (location: GeoPosition) => resolve(location.coords),
      (e) => reject(e),
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
        maximumAge: 10000,
      }
    );
  });
};
