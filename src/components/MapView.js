import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';

const MapComponent = () => {
  const selectedPlace = useSelector(state => state.search.selectedPlace);
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default latitude
    longitude: -122.4324, // Default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (
      selectedPlace &&
      selectedPlace.details &&
      selectedPlace.details.geometry
    ) {
      const {lat, lng} = selectedPlace.details.geometry.location;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedPlace]);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region}>
          {selectedPlace &&
            selectedPlace.details &&
            selectedPlace.details.geometry && (
              <Marker
                coordinate={{
                  latitude: selectedPlace.details.geometry.location.lat,
                  longitude: selectedPlace.details.geometry.location.lng,
                }}
                title={selectedPlace.name}
              />
            )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10, // Adjust the borderRadius as needed
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
