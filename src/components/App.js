import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import Header from './Header';
import MapView from './MapView';
import { getIPLocation } from '../utils/ipinfoAPI';
import { getPlaces } from '../utils/yelpApi';
import './App.css';
import hardCopy from '../data/places.json';

class App extends Component {

  state = {
    lat: 0, //41.6781432,
    lng: 0, //-70.310088,
    zoom: 11,
    city: '',
    state: '',
    country: '',
    ipAddress: '',
    postal: '',
    isDrawerOpen: false,
    places: [],
    filteredPlaces: [],
    query: '',
    isInfoWindowOpen: false,
    activeMarker: {}
  }

  componentDidMount() {
    getIPLocation().then(ipData => {
      let lat = parseFloat(ipData.loc.split(',')[0]);
      let lng = parseFloat(ipData.loc.split(',')[1]);
      getPlaces(lat, lng)
        .then(data => {
          //If Yelp search returns sufficient results load them
          if (data.businesses.length >= 5) {
            this.setState({
              places: data.businesses,
              filteredPlaces: data.businesses,
              lat,
              lng,
              city: ipData.city,
              state: ipData.region,
              country: ipData.country,
              postal: ipData.postal,
              ipAddress: ipData.ip
            });
          } else { //if Yelp search returns unsufficient or no results, load defaults
            this.setState({
              places: hardCopy.businesses,
              filteredPlaces: hardCopy.businesses,
              lat: 41.6781432,
              lng: -70.310088,
              city: 'Cape Cod',
              state: 'MA',
              country: 'USA',
              postal: '02601',
              ipAddress: '0.0.0.0'
            })
          }
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  toggleDrawer = () => {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen});
  }

  filterPlaces = (query) => {
    this.setState({
      filteredPlaces: this.state.places.filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase())),
      query
    })
  }

  updateMarkers = (markers) => {
    this.setState({markers});
  }

  removeMarkers = () => {
    this.state.markers && this.state.markers.forEach(marker => marker.setMap(null))
  }

  clickMarker = (marker) => {
    marker.setAnimation(1);
    this.state.activeMarker.animation && this.state.activeMarker.setAnimation(null);
    this.setState({
      activeMarker: marker,
      isDrawerOpen: false,
      isInfoWindowOpen: true
    })
  }

  toggleInfoWindow = () => {
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen});
  }

  closeInfoWindow = () => {
    this.state.activeMarker.animation && this.state.activeMarker.setAnimation(null);
    this.setState({
      isInfoWindowOpen: false,
      activeMarker: {}
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          city={this.state.city}
          state={this.state.state}
          onToggleDrawer={this.toggleDrawer}
        />
        <MenuDrawer
          isDrawerOpen={this.state.isDrawerOpen}
          onToggleDrawer={this.toggleDrawer}
          places={this.state.filteredPlaces}
          onFilterPlaces={this.filterPlaces}
          onClickMarker={this.clickMarker}
          query={this.state.query}
          markers={this.state.markers}
        />
        <MapView
          zoom={this.state.zoom}
          lat={this.state.lat}
          lng={this.state.lng}
          places={this.state.filteredPlaces}
          markers={this.state.markers}
          activeMarker={this.state.activeMarker}
          isInfoWindowOpen={this.state.isInfoWindowOpen}
          onClickMarker={this.clickMarker}
          onToggleInfoWindow={this.toggleInfoWindow}
          onCloseInfoWindow={this.closeInfoWindow}
          onUpdateMarkers={this.updateMarkers}
          onRemoveMarkers={this.removeMarkers}
        />
      </div>
    );
  }
}

export default App;
