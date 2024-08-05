// src/persistConfig.js
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for the persist storage
  storage: AsyncStorage, // Using AsyncStorage for React Native
  whitelist: ['search'], // List of reducers to persist
  // blacklist: ['someNonPersistedReducer'] // If you want to exclude some reducers
};

export default persistConfig;
