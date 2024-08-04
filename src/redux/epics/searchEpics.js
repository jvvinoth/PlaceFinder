import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  SEARCH_PLACES,
  searchPlacesSuccess,
  searchPlacesFailure,
} from '../actions/searchActions';

// Load API key from environment variables
const API_KEY = 'key'; // Ensure this is correctly set in your environment

const searchPlacesEpic = action$ =>
  action$.pipe(
    ofType(SEARCH_PLACES),
    switchMap(action => {
      const input = encodeURIComponent(action.payload); // Encode the query to handle special characters
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}&types=(cities)&language=en`;

      return ajax.getJSON(url).pipe(
        map(response => {
          console.log('res',response)
          // Optionally, handle unexpected response structures
          if (response && response.predictions) {
            return searchPlacesSuccess(response.predictions);
          } else {
            return searchPlacesFailure('Unexpected response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching places:', error); // Add more descriptive logging if needed
          return of(searchPlacesFailure(error.message));
        })
      );
    })
  );

export default searchPlacesEpic;
