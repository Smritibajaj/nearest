import {combineReducers} from 'redux';
import placesReducer from './places-reducer';


export default combineReducers({
  places: placesReducer,
});
