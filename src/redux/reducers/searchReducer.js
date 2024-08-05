// reducers/searchReducer.js
import {
  SEARCH_PLACES_SUCCESS,
  SEARCH_PLACES_FAILURE,
  CLEAR_HISTORY,
  LOAD_HISTORY_SUCCESS,
  LOAD_HISTORY_FAILURE,
} from '../actions/searchActions';

const initialState = {
  history: [],
  selectedPlace: null,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLACES_SUCCESS:
      return {
        ...state,
        history: Array.isArray(action.payload)
          ? [...state.history, ...action.payload]
          : [...state.history],
        selectedPlace: Array.isArray(action.payload) ? action.payload[0] : null,
      };
    case SEARCH_PLACES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };
    case LOAD_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload,
      };
    case LOAD_HISTORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
