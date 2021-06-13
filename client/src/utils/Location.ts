import {
  GeoCoordinates,
  GeoPosition,
  getCurrentPosition,
} from 'react-native-geolocation-service';

export const getPosition = async (): Promise<GeoCoordinates> => {
  return new Promise((resolve, reject) => {
    getCurrentPosition(
      (location: GeoPosition) => resolve(location.coords),
      (e) => reject(e),
      { enableHighAccuracy: true, showLocationDialog: true }
    );
  });
};
