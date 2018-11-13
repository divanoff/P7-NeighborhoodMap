import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import MapError from './MapError'

const API_KEY = process.env.REACT_APP_GMAPS_API;
 
class MapView extends Component {
    state = {
        map: {}
    }

    componentDidUpdate(prevProps) {
        if (prevProps.places.length !== this.props.places.length) {
            this.props.onRemoveMarkers();
            let bounds = new this.props.google.maps.LatLngBounds();
            let markers = this.props.places.map((place, index) => {
                return new this.props.google.maps.Marker({
                    position: {lat: place.coordinates.latitude, lng: place.coordinates.longitude},
                    map: this.state.map,
                    name: place.name,
                    animation: this.props.google.maps.Animation.DROP,
                    imgURL: place.image_url,
                    url: place.url,
                    rating: place.rating,
                    index
                });
            });
            this.props.onUpdateMarkers(markers);
            markers.forEach(marker => {
                this.props.google.maps.event.addListener(marker, 'click', () => {
                    this.props.onClickMarker(marker);
                });
                bounds.extend(marker.position);
            });
            this.state.map && markers.length && this.state.map.fitBounds(bounds);
        }
    }

    render() {
        return (
            <div className="map-view">
                <Map 
                    role='application'
                    aria-label='map'
                    google={this.props.google} 
                    zoom={this.props.zoom} 
                    initialCenter={{lat: this.props.lat, lng: this.props.lng}}
                    onReady={(props, map) => this.setState({map})}
                    onClick={this.props.onCloseInfoWindow}
                    >
                    <InfoWindow
                        marker={this.props.activeMarker}
                        visible={this.props.isInfoWindowOpen}
                        onClose={this.props.onCloseInfoWindow}
                    >
                        <div>
                            <h2>{this.props.activeMarker.name}</h2>
                            <img 
                            src={this.props.activeMarker.imgURL} 
                            style={{maxWidth: '200px', maxHeight: '200px'}} 
                            alt={this.props.activeMarker.name} />
                            <h5>Photo source: <a href={this.props.activeMarker.url} target="_blank" rel="noopener noreferrer" >Yelp</a></h5>
                            <p>Yelp Rating: {this.props.activeMarker.rating}</p>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY,
    LoadingContainer: MapError
  })(MapView);