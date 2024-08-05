// searchActions.js

// Action Types
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SEARCH_PLACES_SUCCESS = 'SEARCH_PLACES_SUCCESS';
export const SEARCH_PLACES_FAILURE = 'SEARCH_PLACES_FAILURE';
export const LOAD_HISTORY = 'LOAD_HISTORY';
export const LOAD_HISTORY_SUCCESS = 'LOAD_HISTORY_SUCCESS';
export const LOAD_HISTORY_FAILURE = 'LOAD_HISTORY_FAILURE';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

// Action Creators
export const searchPlaces = (data, details) => ({
  type: SEARCH_PLACES,
  payload: {data, details},
});

export const searchPlacesSuccess = predictions => ({
  type: SEARCH_PLACES_SUCCESS,
  payload: predictions,
});

export const searchPlacesFailure = error => ({
  type: SEARCH_PLACES_FAILURE,
  payload: error,
});

// Action to load stored search history
export const loadHistory = () => ({
  type: LOAD_HISTORY,
});

// Action dispatched when history is successfully loaded
export const loadHistorySuccess = history => ({
  type: LOAD_HISTORY_SUCCESS,
  payload: history,
});

// Action dispatched when loading history fails
export const loadHistoryFailure = error => ({
  type: LOAD_HISTORY_FAILURE,
  payload: error,
});

// Action to clear search history
export const clearHistory = () => ({
  type: CLEAR_HISTORY,
});
