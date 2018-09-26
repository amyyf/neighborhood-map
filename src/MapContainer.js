/* global google */

import React, { Component } from 'react';

class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.mapDiv = React.createRef();
    this.infoWindow = new google.maps.InfoWindow();
    this.map = null;
    this.markers = [];
    this.state = {
      activeMarker: null
    };
  }

  componentDidMount () {
    const mapDiv = this.mapDiv.current;
    this.renderMap(mapDiv);
  }

  populateInfoWindow () {
    this.infoWindow.open(this.map, this.state.activeMarker);
    this.infoWindow.setContent(this.state.activeMarker.title);
  }

  renderMap (mapDiv) {
    const map = new google.maps.Map(mapDiv, {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 12
    });
    this.map = map;
    this.renderMarkers(map);
  }

  renderMarkers (map) {
    const { places } = this.props;
    for (let i = 0; i < places.length; i++) {
      const position = places[i].position;
      const title = places[i].name;
      const id = places[i].id;
      const marker = new google.maps.Marker({
        position: position,
        title: title,
        map: map,
        animation: google.maps.Animation.DROP,
        id: id
      });
      this.markers.push(marker);
    }
  }

  setActiveMarker (event) {
    const markerName = event.target.title;
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i].title === markerName) {
        this.setState({ activeMarker: this.markers[i] }, this.populateInfoWindow.bind(this));
      }
    }
  }

  render () {
    return (
      <div ref={this.mapDiv} onClick={(e) => this.setActiveMarker(e)} style={{width: 500, height: 500}} />
    );
  }
}

export default MapContainer;
