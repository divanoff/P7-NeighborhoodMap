import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import Header from './Header';
import MapView from './MapView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MenuDrawer />
        <MapView />
      </div>
    );
  }
}

export default App;
