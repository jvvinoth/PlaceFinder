import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { searchPlaces } from '../redux/actions/searchActions';
import { connect } from 'react-redux';

const SearchBox = ({ searchPlaces }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const latitude = 35.6895; // Example latitude
    const longitude = 139.6917;
    searchPlaces(query , latitude , longitude);
  };

  return (
    <View style={styles.searchBoxContainer}>
      <Text style={styles.title}>Search places</Text>
      <TextInput
        placeholder="Search places"
        value={query}
        onChangeText={setQuery}
        style={styles.searchBox}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = dispatch => ({
  searchPlaces: data => dispatch(searchPlaces(data)),
});

export default connect(null, mapDispatchToProps)(SearchBox);
