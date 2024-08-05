// reducers/index.js
import {combineReducers} from 'redux';
import searchReducer from './searchReducer'; // Import your reducer

const rootReducer = combineReducers({
  search: searchReducer, // Ensure this is a valid reducer
  // Add other reducers here if needed
});

export default rootReducer;
