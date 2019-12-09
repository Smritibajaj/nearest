import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { receiveClientLoc, receiveZoom, receiveClientMarker } from '../redux/reducers/places-reducer';

import Landing from './Landing';

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const onAppEnter = () => {
  getPosition()
  .then(res => {
    let coords = { lat: res.coords.latitude, lng: res.coords.longitude };
    store.dispatch(receiveClientLoc(coords));
    store.dispatch(receiveZoom(17));
    store.dispatch(receiveClientMarker({ position: coords, key: 'clientLocation', defaultAnimation: 2 }));
  })
  .catch(err => {
    console.error(err.message);
  });
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Landing} onEnter={onAppEnter} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
