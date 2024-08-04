// epics/index.js
import {combineEpics} from 'redux-observable';
import searchPlacesEpic from './epics/searchEpics';
const rootEpic = combineEpics(
  searchPlacesEpic,
  // Add other epics here
);

export default rootEpic;
