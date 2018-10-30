import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import Header from './Header';
import MapView from './MapView';
import { getIPLocation } from './ipinfoAPI';
import './App.css';

class App extends Component {

  state = {
    lat: 41.6781432,
    long: -70.310088,
    zoom: 13,
    city: '',
    state: '',
    country: '',
    ipAddress: '',
    postal: ''
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
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          city={this.state.city}
          state={this.state.state}
        />
        <MenuDrawer />
        <MapView />
      </div>
    );
  }
}

export default App;
