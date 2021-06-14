import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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

export const getPosition = async (): Promise<Geolocation.GeoCoordinates> => {
  const hasPermission = await hasLocationPermission();

  return new Promise((resolve, reject) => {
    if (!hasPermission) {
      reject('No permission');
      return;
    }

    Geolocation.getCurrentPosition(
      (location: Geolocation.GeoPosition) => resolve(location.coords),
      (e) => reject(e),
      { enableHighAccuracy: true }
    );
  });
};
