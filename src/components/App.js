import React, { Component } from 'react';
import './App.css';
import MenuDrawer from './MenuDrawer';
import MapDisplay from './MapDisplay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuDrawer />
        <MapDisplay />
      </div>
    );
  }
}

export default App;
