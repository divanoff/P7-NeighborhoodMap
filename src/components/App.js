import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import Header from './Header';
import MapView from './MapView';
import { getIPLocation } from './ipinfoAPI';
import { getPlaces } from './yelpApi';
import './App.css';

class App extends Component {

  state = {
    lat: 41.6781432,
    lng: -70.310088,
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
    getIPLocation().then(data => {
      let lat = parseFloat(data.loc.split(',')[0]);
      let lng = parseFloat(data.loc.split(',')[1]);
      this.setState({
        lat,
        lng,
        city: data.city,
        state: data.region,
        country: data.country,
        postal: data.postal,
        ipAddress: data.ip
      });
      getPlaces(lat, lng)
        .then(data => {this.setState({places: data.businesses, filteredPlaces: data.businesses})})
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
    console.log(marker);
    this.setState({activeMarker: marker})
    this.openInfoWindow();
    this.setState({isDrawerOpen: false})
  }

  toggleInfoWindow = () => {
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen});
  }

  openInfoWindow = () => {
    this.setState({isInfoWindowOpen: true});
  }

  closeInfoWindow = () => {
    this.setState({isInfoWindowOpen: false});
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

          // onToggleDrawer={this.toggleDrawer}
          // city={this.state.city}
          // state={this.state.state}
          // isDrawerOpen={this.state.isDrawerOpen}
          // onFilterPlaces={this.filterPlaces}
          // query={this.state.query}
        />
      </div>
    );
  }
}

export default App;
