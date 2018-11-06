import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const API_KEY = 'AIzaSyCv5hX2J8Ti68-0eXTxnhFzqg_092P7uKk';
 
class MapView extends Component {
    render() {
        return (
            <div className="map-view">
                <Map 
                    role='application'
                    aria-label='map'
                    google={this.props.google} 
                    zoom={this.props.zoom} 
                    center={{lat: this.props.lat, lng: this.props.lng}}
                    onClick={this.props.onToggleInfoWindow}
                    >
                    {this.props.places.map(place => (
                        <Marker 
                            key={place.id}
                            onClick={(props, marker, e) => this.props.onClickPlace(marker)}
                            name={place.name}
                            position={{lat: place.coordinates.latitude, lng: place.coordinates.longitude}} 
                        />
                    ))}
                    <InfoWindow
                        marker={this.props.activeMarker}
                        visible={this.props.isInfoWindowOpen}
                        onClose={this.props.onToggleInfoWindow}
                    >
                        <div><h3>{this.props.activeMarker.name}</h3></div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
  })(MapView);