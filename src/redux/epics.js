import {combineEpics} from 'redux-observable';
import {
  searchPlacesEpic,
  loadHistoryEpic,
  clearHistoryEpic,
} from './epics/searchEpics';

const rootEpic = combineEpics(
  searchPlacesEpic,
  loadHistoryEpic,
  clearHistoryEpic,
  // Add other epics here if you have any
);

export default rootEpic;
