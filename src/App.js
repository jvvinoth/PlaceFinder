import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import SearchBox from './components/SearchBox';
import MapComponent from './components/MapView';
import SearchHistory from './components/SearchHistory';
import LoadMoreList from './components/LoadMoreList';

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const handleMoreHistory = () => {
    setLoadMore(true);
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          {loadMore ? (
            <View style={{flex: 1}}>
              <LoadMoreList setSelectedPlace={setSelectedPlace} setLoadMore={setLoadMore} />
            </View>
          ) : (
            <>
              <View
                style={[
                  styles.searchBoxContainer,
                  {flex: selectedPlace ? 1.2 : 0.7},
                ]}>
                <SearchBox
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                />
              </View>
              <View style={styles.mapContainer}>
                <MapComponent />
              </View>
              <View style={styles.historyContainer}>
                <SearchHistory
                  setSelectedPlace={setSelectedPlace}
                  handleMoreHistory={handleMoreHistory}
                />
              </View>
            </>
          )}
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '4%',
  },
  searchBoxContainer: {},
  mapContainer: {
    flex: 2,
  },
  historyContainer: {
    flex: 3,
  },
});

export default App;
