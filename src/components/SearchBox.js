import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {connect} from 'react-redux';
import {searchPlaces} from '../redux/actions/searchActions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Antdesign from 'react-native-vector-icons/AntDesign';

const SearchBox = ({searchPlaces, selectedPlace, setSelectedPlace}) => {
  const ref = useRef();

  const handlePress = (data, details) => {
    console.log('Selected Place:', details);
    setSelectedPlace({
      name: data.description,
      address: details.formatted_address,
    });
    searchPlaces(data, details);
  };
  const clearInput = () => {
    if (ref.current) {
      ref.current.clear(); // Clear the input field
    }
    // setSelectedPlace(null); // Clear the selected place state
  };
  return (
    <View style={styles.searchBoxContainer}>
      <Text style={styles.title}>Search places</Text>
      <View style={{flexDirection: 'row'}}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Search places"
          onPress={handlePress}
          query={{
            key: 'XXXX', // Replace with your actual API key
            language: 'en',
          }}
          fetchDetails={true}
          debounce={200}
          styles={{
            container: styles.autocompleteContainer,
            listView: styles.autocompleteListView,
            textInput: styles.searchBox,
          }}
          listEmptyComponent={() => (
            <View style={styles.emptyComponent}>
              <Text>No results were found</Text>
            </View>
          )}
        />
        {selectedPlace && (
          <TouchableOpacity style={styles.button} onPress={clearInput}>
            <Antdesign name="close" size={20} color={'black'} />
          </TouchableOpacity>
        )}
      </View>
      {selectedPlace && (
        <View style={styles.selectedPlaceContainer}>
          <Text style={styles.selectedPlaceTitle}>Selected Location</Text>
          <Text style={styles.selectedPlaceName}>{selectedPlace.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    flex: 1,
  },
  errorText: {
    color: 'red',
  },
  autocompleteContainer: {
    flex: 1,
    zIndex: 1,
  },
  autocompleteListView: {
    backgroundColor: 'white',
    zIndex: 2,
    elevation: 2,
    position: 'absolute',
    top: 50,
  },
  emptyComponent: {
    flex: 1,
    padding: 10,
  },
  selectedPlaceContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    height: heightPercentageToDP('6%'),
    // marginVertical: '2%',
    justifyContent: 'center',
    paddingLeft: '2%',
  },
  selectedPlaceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedPlaceName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectedPlaceAddress: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    // position: 'absolute',
    width: widthPercentageToDP('7%'),
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  loading: state.search.loading,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  searchPlaces: (data, details) => dispatch(searchPlaces(data, details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
