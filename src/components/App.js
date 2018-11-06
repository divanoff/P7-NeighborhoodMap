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
    long: -70.310088,
    zoom: 10,
    city: '',
    state: '',
    country: '',
    ipAddress: '',
    postal: '',
    isDrawerOpen: false,
    places: []
  }

  componentDidMount() {
    getIPLocation().then(data => {
      this.setState({
        lat: parseFloat(data.loc.split(',')[0]),
        long: parseFloat(data.loc.split(',')[1]),
        city: data.city,
        state: data.region,
        country: data.country,
        postal: data.postal,
        ipAddress: data.ip
      });
    }).catch(e => console.log(e));
    getPlaces(this.state.lat, this.state.long)
      .then(data => {
        this.setState({places: data.businesses})
      })
      .catch(e => console.log(e));
  }

  toggleDrawer = () => {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen});
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
          places={this.state.places}
        />
        <MapView />
      </div>
    );
  }
}

export default App;
