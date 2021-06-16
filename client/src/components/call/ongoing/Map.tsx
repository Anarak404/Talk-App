import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { callContext, dataStoreContext } from '../../../contexts';

export function Map() {
  const { locations } = useContext(callContext);
  const { findUser } = useContext(dataStoreContext);
  const mapRef = useRef<MapView>(null);

  const locationData = useMemo(
    () =>
      locations
        .filter((e) => {
          const { x, y } = e.location;
          return x !== null && y !== null;
        })
        .map((x) => {
          return { location: x.location, user: findUser(x.userId) };
        }),
    [locations, findUser]
  );

  const centerView = useCallback(() => {
    const timeout = 500;

    setTimeout(() => {
      const ids = locationData
        .filter((e) => e.user)
        .map((e) => e.user!.id.toString());

      const padding = 150;

      mapRef.current?.fitToSuppliedMarkers(ids, {
        animated: true,
        edgePadding: {
          bottom: padding,
          left: padding,
          right: padding,
          top: padding,
        },
      });
    }, timeout);
  }, [locationData, mapRef]);

  useEffect(() => centerView(), [centerView]);

  return (
    <MapView style={styles.map} ref={mapRef} onMapReady={centerView}>
      {locationData.map((x) => {
        const { location, user } = x;

        if (location.x === null || location.y === null) {
          return;
        }

        const longitude = location.x;
        const latitude = location.y;
        return (
          <Marker
            coordinate={{ longitude, latitude }}
            title={user?.name}
            key={user?.id}
            identifier={user?.id.toString()}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
