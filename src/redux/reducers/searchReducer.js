import {SEARCH_PLACES_SUCCESS, SEARCH_PLACES_FAILURE} from '../actions/types';

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
        history: [...state.history, ...action.payload],
        selectedPlace: action.payload[0],
      };
    case SEARCH_PLACES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
