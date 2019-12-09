import axios from 'axios';

// constants

const RECEIVE_PLACES = 'RECEIVE_PLACES';
const RECEIVE_CLIENT_LOC = 'RECEIVE_CLIENT_LOC';
const RECEIVE_ZOOM = 'RECEIVE_ZOOM';
const RECEIVE_CLIENT_MARK = 'RECEIVE_CLIENT_MARK';
const RECEIVE_FILTER_LEVEL = 'RECEIVE_FILTER_LEVEL';
const RECEIVE_FILTERED_MARKERS = 'RECEIVE_FILTERED_MARKERS';
const RECEIVE_SELECTED = 'RECEIVE_SELECTED';
const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS';


const initialPlacesState = {
  clientLocation: { lat: 39.5, lng: -98.35 },
  zoomLevel: 3,
  clientMarker: {
      position: { lat: 39.5, lng: -98.35 },
      key: 'clientLocation',
      defaultAnimation: 2
  },
  markers: [],
  filteredMarkers: [],
  filterLevel: 1,
  selected: null,
  directions: null
};

export default function (state = initialPlacesState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_PLACES:
      newState.markers = action.places;
      break;

    case RECEIVE_CLIENT_LOC:
      newState.clientLocation = action.location;
      break;

    case RECEIVE_ZOOM:
      newState.zoomLevel = action.zoom;
      break;

    case RECEIVE_CLIENT_MARK:
      newState.clientMarker = action.clientMarker;
      break;

    case RECEIVE_FILTER_LEVEL:
      newState.filterLevel = action.filterLevel;
      break;

    case RECEIVE_FILTERED_MARKERS:
      newState.filteredMarkers = action.filteredMarkers;
      break;

    case RECEIVE_SELECTED:
      newState.selected = action.selected;
      break;

    case RECEIVE_DIRECTIONS:
      newState.directions = action.directions;
      break;

    default:
      return state;
  }

  return newState;
}

// action-creators

export const receivePlaces = places => ({ type: RECEIVE_PLACES, places });
export const receiveClientLoc = location => ({ type: RECEIVE_CLIENT_LOC, location });
export const receiveZoom = zoom => ({ type: RECEIVE_ZOOM, zoom });
export const receiveClientMarker = clientMarker => ({ type: RECEIVE_CLIENT_MARK, clientMarker });
export const receiveFilterLevel = filterLevel => ({ type: RECEIVE_FILTER_LEVEL, filterLevel });
export const receiveFilteredMarkers = filteredMarkers => ({ type: RECEIVE_FILTERED_MARKERS, filteredMarkers });
export const receiveSelected = selected => ({ type: RECEIVE_SELECTED, selected });
export const receiveDirections = directions => ({ type: RECEIVE_DIRECTIONS, directions });

// thunked actions

export const getPlaces = (lat, lng, type, fL) => {
  return dispatch => {
    // console.log(lat, lng, type, fL)
    axios.get(`/api/data/${lat}/${lng}/${type}`)
    .then(res => {
      let places = res.data.results;
      dispatch(receivePlaces(places));
      return places;
    })
    .then(places => {
      let i = 0;
      let filtered = [];
      while (i < fL) {
        filtered.push(places[i]);
        i++;
      }
      dispatch(receiveFilteredMarkers(filtered));
    })
    .catch(err => console.error('loading places unsuccessful', err));
  };
};
