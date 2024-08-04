import * as React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import SearchBox from './components/SearchBox';
import MapComponent from './components/MapView';
import SearchHistory from './components/SearchHistory';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20, textAlign: 'center', margin: 20 }}>
          Place Finder App
        </Text>
        <View style={styles.searchBoxContainer}>
          <SearchBox />
        </View>
        <View style={styles.mapContainer}>
          <MapComponent />
        </View>
        <View style={styles.historyContainer}>
          <SearchHistory />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBoxContainer: {
    padding: 10,
  },
  mapContainer: {
    flex: 2,
    marginVertical: 10,
  },
  historyContainer: {
    flex: 1,
    padding: 10,
  },
});

export default App;
