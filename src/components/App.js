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
      this.setState({
        lat: parseFloat(data.loc.split(',')[0]),
        lng: parseFloat(data.loc.split(',')[1]),
        city: data.city,
        state: data.region,
        country: data.country,
        postal: data.postal,
        ipAddress: data.ip
      });
      getPlaces(data.loc.split(',')[0], data.loc.split(',')[1])
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

  clickPlace = (place) => {
    console.log(place);
    this.setState({activeMarker: place})
    this.toggleInfoWindow();
  }

  toggleInfoWindow = () => {
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen});
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
          onClickPlace={this.clickPlace}
          query={this.state.query}
        />
        <MapView
          zoom={this.state.zoom}
          lat={this.state.lat}
          lng={this.state.lng}
          places={this.state.filteredPlaces}
          activeMarker={this.state.activeMarker}
          isInfoWindowOpen={this.state.isInfoWindowOpen}
          onClickPlace={this.clickPlace}
          onToggleInfoWindow={this.toggleInfoWindow}
        />
      </div>
    );
  }
}

export default App;
