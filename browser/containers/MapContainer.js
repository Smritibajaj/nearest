import { withGoogleMap, GoogleMap, InfoWindow, Marker, DirectionsRenderer } from 'react-google-maps';
import React from 'react';
import _ from 'lodash';
// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    center={props.clientLocation}
    zoom={props.zoom}
  >
    <Marker key={props.clientMarker && props.clientMarker.key} position={props.clientMarker && props.clientMarker.position} />
    {props.markers && props.markers.map((marker, index) => (
      <Marker
        key={marker.id}
        position={marker.geometry.location}
        onClick={() => props.onMarkerClick(marker)}
      >
      {marker.showInfo && (
        <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
          <div>
            <h3>{marker.name}</h3>
            <em><p>{marker.vicinity}</p></em>
            <p>{marker.rating}</p>
            <p>{marker.price}</p>
          </div>
        </InfoWindow>
      )}
      </Marker>
    ))}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));
// Then, render it:

export default class MyMap extends React.Component {

    render() {
    return (
      <GettingStartedGoogleMap
        containerElement={
          <div style={{ height: `100vh`, width: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        markers={this.props.markers}
        clientMarker={this.props.clientMarker}
        onMarkerClick={this.props.handleMarkerClick}
        onMarkerClose={this.props.handleMarkerClose}
        clientLocation={this.props.clientLocation}
        zoom={this.props.zoom}
        directions={this.props.directions}
      />
    );
  }
}
