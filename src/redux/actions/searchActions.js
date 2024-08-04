// searchActions.js
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SEARCH_PLACES_SUCCESS = 'SEARCH_PLACES_SUCCESS';
export const SEARCH_PLACES_FAILURE = 'SEARCH_PLACES_FAILURE';

export const searchPlaces = (query, latitude, longitude) => ({
  type: SEARCH_PLACES,
  payload: {query, latitude, longitude},
});

export const searchPlacesSuccess = predictions => ({
  type: SEARCH_PLACES_SUCCESS,
  payload: predictions,
});

export const searchPlacesFailure = error => ({
  type: SEARCH_PLACES_FAILURE,
  payload: error,
});
