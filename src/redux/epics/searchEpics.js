import {ofType} from 'redux-observable';
import {switchMap, map, catchError, concatMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of, from, forkJoin} from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SEARCH_PLACES,
  LOAD_HISTORY,
  CLEAR_HISTORY,
  searchPlacesSuccess,
  searchPlacesFailure,
  loadHistorySuccess,
  loadHistoryFailure,
} from '../actions/searchActions';

const API_KEY = 'XXXXXXX'; // Replace with your secure method of managing API keys

const searchPlacesEpic = action$ =>
  action$.pipe(
    ofType(SEARCH_PLACES),
    switchMap(action => {
      const {data, details} = action.payload;
      const input = encodeURIComponent(data?.description); // Encode the query to handle special characters
      const latitude = details?.geometry?.location?.lat;
      const longitude = details?.geometry?.location?.lng;
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${latitude},${longitude}&radius=50000&key=${API_KEY}`;

      return ajax.getJSON(url).pipe(
        concatMap(response => {
          if (response && response.predictions) {
            const placeDetailsRequests = response.predictions.map(
              prediction => {
                const placeId = prediction.place_id;
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${API_KEY}`;
                return ajax.getJSON(detailsUrl).pipe(
                  map(detailsResponse => ({
                    ...prediction,
                    details: detailsResponse.result,
                  })),
                );
              },
            );

            return forkJoin(placeDetailsRequests).pipe(
              switchMap(placesWithDetails => {
                const matchedPlaces = placesWithDetails.filter(place => {
                  return (
                    place.description === data?.description &&
                    place.details.geometry.location.lat === latitude &&
                    place.details.geometry.location.lng === longitude
                  );
                });

                return from(AsyncStorage.getItem('searchHistory')).pipe(
                  switchMap(existingHistory => {
                    const parsedHistory = JSON.parse(existingHistory) || [];
                    const updatedHistory = [...parsedHistory, ...matchedPlaces];

                    return from(
                      AsyncStorage.setItem(
                        'searchHistory',
                        JSON.stringify(updatedHistory),
                      ),
                    ).pipe(
                      map(() => searchPlacesSuccess(matchedPlaces)),
                      catchError(error =>
                        of(searchPlacesFailure(error.message)),
                      ),
                    );
                  }),
                  catchError(error => of(searchPlacesFailure(error.message))),
                );
              }),
              catchError(error => of(searchPlacesFailure(error.message))),
            );
          } else {
            return of(searchPlacesFailure('Unexpected response format'));
          }
        }),
        catchError(error => {
          console.error('Error fetching places:', error);
          return of(searchPlacesFailure(error.message));
        }),
      );
    }),
  );

const loadHistoryEpic = action$ =>
  action$.pipe(
    ofType(LOAD_HISTORY),
    switchMap(() =>
      from(AsyncStorage.getItem('searchHistory')).pipe(
        switchMap(history => {
          console.log('get item', history); // Debugging line to check what is being retrieved
          const parsedHistory = JSON.parse(history) || [];
          return of(loadHistorySuccess(parsedHistory));
        }),
        catchError(error => of(loadHistoryFailure(error.message))),
      ),
    ),
  );

const clearHistoryEpic = action$ =>
  action$.pipe(
    ofType(CLEAR_HISTORY),
    switchMap(() =>
      from(AsyncStorage.removeItem('searchHistory')).pipe(
        switchMap(() => {
          console.log('Search history cleared from AsyncStorage');
          // Return a single action to reset the history in the store
          return of(loadHistorySuccess([]), searchPlacesSuccess([]));
        }),
        catchError(error => {
          console.error('Error clearing search history:', error);
          return of(loadHistoryFailure(error.message));
        }),
      ),
    ),
  );

export {searchPlacesEpic, loadHistoryEpic, clearHistoryEpic};
