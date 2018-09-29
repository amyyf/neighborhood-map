/* global google */

import React, { Component } from 'react';

class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.infoWindow = new google.maps.InfoWindow();
    this.map = null;
    this.mapDiv = React.createRef();
  }

  componentDidUpdate () {
    const mapDiv = this.mapDiv.current;
    this.renderMap(mapDiv);
  }

  populateInfoWindow () {
    const marker = this.props.activeMarker;
    let venue, descrip;
    let price = '';
    for (let i = 0; i < this.props.places.length; i++) {
      if (this.props.places[i].id === marker.id) {
        venue = this.props.places[i];
      }
    }
    if (venue.description === undefined) {
      descrip = '';
    } else {
      descrip = venue.description;
    }
    for (let i = 0; i < venue.priceTier; i++) {
      price += '$';
    }
    this.infoWindow.open(this.map, marker);
    this.infoWindow.setContent(`
      <h3>${venue.name}</h3>
      <h4>${venue.address}</h4>
      <h4>Established in ${venue.yearOpened}</h4>
      <p>${descrip}</p>
      <p>Price: ${price}</p>
      <p>Rating: ${venue.rating} / 10</p>
      <a href='${venue.url}'>Website</a>
    `);
  }

  renderMap (mapDiv) {
    if (!mapDiv) {
      return;
    }
    const map = new google.maps.Map(mapDiv, {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 12
    });
    this.map = map;
    this.renderMarkers(map);
  }

  renderMarkers (map) {
    this.props.places.forEach(place => {
      const position = place.position;
      const title = place.name;
      const id = place.id;
      const marker = new google.maps.Marker({
        position: position,
        title: title,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: this.props.setMarkerIcon(this.props.markerColor.initial),
        id: id
      });
      marker.addListener('click', () => this.props.setActiveMarker(marker.title));
      this.props.markers.push(marker);
    });
  }

  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    this.renderMap();
    if (this.props.activeMarker) {
      this.populateInfoWindow();
    }
    return (
      <div ref={this.mapDiv} style={{width: 500, height: 500}} />
    );
  }
}

export default MapContainer;
