import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class MapView extends Component {
    render() {
        return (
            <div className="map-view">
                <Map 
                    google={this.props.google} 
                    zoom={this.props.zoom} 
                    center={{lat: this.props.lat, lng: this.props.lng}}>
                    {this.props.places.map(place => (
                        <Marker 
                            key={place.id}
                            onClick={e => this.props.onClickPlace(e)}
                            name={place.name}
                            position={{lat: place.coordinates.latitude, lng: place.coordinates.longitude}} 
                        />
                    ))}
                    
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCv5hX2J8Ti68-0eXTxnhFzqg_092P7uKk'
  })(MapView);