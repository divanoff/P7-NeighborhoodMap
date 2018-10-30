import React, { Component } from 'react';
import './App.css';
import MenuDrawer from './MenuDrawer';
import MapDisplay from './MapDisplay';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MenuDrawer />
        <MapDisplay />
      </div>
    );
  }
}

export default App;
