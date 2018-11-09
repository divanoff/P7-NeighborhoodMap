import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Header from './Header';
import MenuDrawer from './MenuDrawer';

const API_KEY = 'AIzaSyCv5hX2J8Ti68-0eXTxnhFzqg_092P7uKk';
 
class MapView extends Component {
    state = {
        map: {}
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         console.log(this.props.places)
    //     }, 2000);
    //     console.log(this.props.places)
    // }

    componentDidUpdate(prevProps) {
        if (prevProps.places.length !== this.props.places.length) {
            this.props.onRemoveMarkers();
            let markers = this.props.places.map((place, index) => {
                return new this.props.google.maps.Marker({
                    position: {lat: place.coordinates.latitude, lng: place.coordinates.longitude},
                    map: this.state.map,
                    name: place.name,
                    animation: this.props.google.maps.Animation.DROP,
                    // onClick: (props, marker) => this.props.onClickMarker(marker),
                    index
                });
            });
            this.props.onUpdateMarkers(markers);
            markers.forEach(marker => this.props.google.maps.event.addListener(marker, 'click', () => {
                this.props.onClickMarker(marker);
            }));
            
            // this.state.markers.forEach(marker => marker.setMap(null));
            // this.setState({markers: this.props.places.map((place, index) => {
            //     return new this.props.google.maps.Marker({
            //         position: {lat: place.coordinates.latitude, lng: place.coordinates.longitude},
            //         map: this.state.map
            //     });
            // })});
        }
    }

    render() {
        return (
            <div className="map-view">
                {/* <Header
                    city={this.props.city}
                    state={this.props.state}
                    onToggleDrawer={this.props.onToggleDrawer}
                />
                <MenuDrawer
                    isDrawerOpen={this.props.isDrawerOpen}
                    onToggleDrawer={this.props.onToggleDrawer}
                    places={this.props.places}
                    onFilterPlaces={this.props.onFilterPlaces}
                    onClickPlace={this.props.clickPlace}
                    query={this.props.query}
                /> */}
                <Map 
                    role='application'
                    aria-label='map'
                    google={this.props.google} 
                    zoom={this.props.zoom} 
                    center={{lat: this.props.lat, lng: this.props.lng}}
                    onReady={(props, map) => this.setState({map})}
                    onClick={this.props.onCloseInfoWindow}
                    onMarkerClick={(props, marker) => this.props.onMarkerClick(marker)}
                    >
                    {/* {this.props.places.map(place => (
                        <Marker 
                            key={place.id}
                            onClick={(props, marker, e) => this.props.onClickPlace(marker)}
                            name={place.name}
                            position={{lat: place.coordinates.latitude, lng: place.coordinates.longitude}} 
                        />
                    ))} */}
                    <InfoWindow
                        marker={this.props.activeMarker}
                        visible={this.props.isInfoWindowOpen}
                        onClose={this.props.onCloseInfoWindow}
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