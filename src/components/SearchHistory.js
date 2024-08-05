import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {clearHistory} from '../redux/actions/searchActions'; // Ensure this path is correct
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const SearchHistory = ({handleMoreHistory}) => {
  const searchHistory = useSelector(state => state.search.history);
  const dispatch = useDispatch();

  // Reverse the searchHistory to display the newest items first
  const reversedHistory = [...searchHistory].reverse();

  // Limit to the latest 4 items
  const latestHistory = reversedHistory.slice(1, 5);
  const truncated = (text, value) =>
    text?.length > value ? `${text.substring(0, value)}...` : text;
  // Render a single item in the list
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{truncated(item.description, 34)}</Text>
        <Text style={styles.rating}>4.0 ★★★★☆ (48,099)</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // flex: 1,
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.icon}>
          <FontAwesome name="phone" color={'rgba(3, 138, 255,1)'} size={15} />
        </View>
        <View style={styles.icon}>
          <Feather name="navigation-variant" color={'rgba(3, 138, 255,1)'} size={15} />
        </View>
      </View>
    </View>
  );

  // Handle clear history button press
  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <View style={styles.container}>
      {latestHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No search history available.</Text>
        </View>
      ) : (
        <FlatList
          data={latestHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
      {latestHistory.length !== 0 && (
        <TouchableOpacity style={styles.button} onPress={handleMoreHistory}>
          <Text style={styles.buttonText}>Search History</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    // padding: 10,
  },
  card: {
    marginVertical: '2%',
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    height: heightPercentageToDP('10%'),
    borderWidth: 1,
    padding: '4%',
    justifyContent: 'space-between',
    borderColor: '#ccc',
  },
  header: {
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  rating: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'rgba(3, 138, 255,1)',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    borderWidth: 1,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP('10%'),
    height: heightPercentageToDP('5%'),
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    marginHorizontal: widthPercentageToDP('2%'),
  },
});

export default SearchHistory;
