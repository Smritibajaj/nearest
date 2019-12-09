import React from 'react';
import MapContainer from '../containers/MapContainer';
import Sidebar from './Sidebar';
import Nav from './Nav';

import { connect } from 'react-redux';
import { getPlaces, receiveFilterLevel, receiveFilteredMarkers, receiveSelected, receiveDirections } from '../redux/reducers/places-reducer';

class Landing extends React.Component {

  constructor() {
    super();
    this.typeChange = this.typeChange.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  typeChange(event) {
    let type = event.target.value;
    let lat = this.props.clientLocation.lat;
    let lng = this.props.clientLocation.lng;
    let fL = this.props.filterLevel;

    this.props.getPlaces(lat, lng, type, fL);
  }

  filterChange(event) {
    let level = event.target.value;
    let markers = this.props.markers;

    this.props.adjustFilter(level);
    let i = 0;
    let filtered = [];
    while (i < level) {
      filtered.push(markers[i]);
      i++;
    }
    this.props.getFilteredMarkers(filtered);
  }

  handleMarkerClick(targetMarker) {
    let newMarkers = this.props.filteredMarkers.map(marker => {
      if (marker === targetMarker) {
        let m = marker;
        m.showInfo = true;
        this.props.setSelected(m);
        return m;
      }
      return marker;
    });
    this.props.getFilteredMarkers(newMarkers);
  }

  handleMarkerClose(targetMarker) {
    let newMarkers = this.props.filteredMarkers.map(marker => {
      if (marker === targetMarker) {
        let m = marker;
        m.showInfo = false;
        this.props.setSelected(null);
        this.props.setDirections(null);
        return m;
      }
      return marker;
    });
    this.props.getFilteredMarkers(newMarkers);
  }

  getDirections() {
    let google = window.google;

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: this.props.clientLocation,
      destination: this.props.selected.geometry.location,
      travelMode: google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.props.setDirections(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    return (
      <div className='container-fluid'>
        <Nav />
        <Sidebar
          typeChange={this.typeChange}
          filterChange={this.filterChange}
          clientLocation={this.props.clientLocation}
          getPlaces={this.props.getPlaces}
          selected={this.props.selected}
          handleDirectionClick={this.getDirections}
        />
        <div>
          <MapContainer
            clientLocation={this.props.clientLocation}
            zoom={this.props.zoomLevel}
            markers={this.props.filteredMarkers}
            clientMarker={this.props.clientMarker}
            handleMarkerClick={this.handleMarkerClick}
            handleMarkerClose={this.handleMarkerClose}
            directions={this.props.directions}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clientLocation: state.places.clientLocation,
  zoomLevel: state.places.zoomLevel,
  clientMarker: state.places.clientMarker,
  markers: state.places.markers,
  filterLevel: state.places.filterLevel,
  filteredMarkers: state.places.filteredMarkers,
  selected: state.places.selected,
  directions: state.places.directions
});

const mapDispatchToProps = dispatch => {
  return {
    getPlaces(lat, lng, type, fL) {
      dispatch(getPlaces(lat, lng, type, fL));
    },
    adjustFilter(level) {
      dispatch(receiveFilterLevel(level));
    },
    getFilteredMarkers(markers) {
      dispatch(receiveFilteredMarkers(markers));
    },
    setSelected(marker) {
      dispatch(receiveSelected(marker));
    },
    setDirections(directions) {
      dispatch(receiveDirections(directions));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
