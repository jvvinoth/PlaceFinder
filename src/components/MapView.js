import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';

const MapComponent = () => {
  const selectedPlace = useSelector(state => state.search.selectedPlace);

  useEffect(() => {
    if (selectedPlace) {
      console.log('Selected Place:', selectedPlace);
    }
  }, [selectedPlace]); // Re-run effect when selectedPlace changes

  return (
    // <MapView
    //   style={styles.map}
    //   initialRegion={{
    //     latitude: selectedPlace?.geometry?.location?.lat || 37.78825,
    //     longitude: selectedPlace?.geometry?.location?.lng || -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   }}>
    //   {selectedPlace && (
    //     <Marker
    //       coordinate={{
    //         latitude: selectedPlace.geometry.location.lat,
    //         longitude: selectedPlace.geometry.location.lng,
    //       }}
    //       title={selectedPlace.name}
    //     />
    //   )}
    // </MapView>
    <View style={[styles.map,{backgroundColor:'grey'}]}>
      <Text>'Map View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
