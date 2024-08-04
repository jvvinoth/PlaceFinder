# Place Finder App

This is a React Native application that allows users to search for places using the Google Places API, view the location on a map, and see their search history.

## Features

- Search for places using Google Places Autocomplete API
- View selected place on a map
- Display search history

## Project Structure

The project follows the MVVM architecture pattern with the following structure:

PlaceFinderApp/
├── __tests__/
│   ├── App.test.js
├── src/
│   ├── components/
│   │   ├── SearchBox.js
│   │   ├── MapView.js
│   │   ├── SearchHistory.js
│   ├── models/
│   │   ├── Place.js
│   ├── views/
│   │   ├── AppView.js
│   ├── viewmodels/
│   │   ├── PlaceViewModel.js
│   ├── redux/
│   │   ├── actions/
│   │   │   ├── types.js
│   │   │   ├── searchActions.js
│   │   ├── reducers/
│   │   │   ├── index.js
│   │   │   ├── searchReducer.js
│   │   ├── epics/
│   │   │   ├── searchEpics.js
│   │   ├── store.js
│   ├── App.js
├── README.md
├── package.json