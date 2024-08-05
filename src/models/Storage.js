// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveHistoryToStorage = async (history) => {
  try {
    await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
};

export const loadHistoryFromStorage = async () => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
};

export const clearHistoryFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('searchHistory');
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};
