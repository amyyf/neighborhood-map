/* global google */

import React, { Component } from 'react';

class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.infoWindow = new google.maps.InfoWindow();
    this.infoWindow.addListener('closeclick', () => this.props.setActivePlace(null));
    this.map = null;
    this.mapDiv = React.createRef();
    this.markerColor = {
      active: 'FFFF24',
      initial: '0091ff'
    };
    this.state = {
      markers: []
    };
    this.populateInfoWindow = this.populateInfoWindow.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }

  componentDidUpdate () {
    const mapDiv = this.mapDiv.current;
    this.renderMap(mapDiv);
  }

  populateInfoWindow () {
    const marker = this.state.markers.find(marker => marker.place === this.props.activePlace);
    const venue = this.props.activePlace;
    let descrip;
    let price = '';
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
    if (!this.map) {
      const map = new google.maps.Map(mapDiv, {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 12
      });
      this.map = map;
    }
    if (this.state.markers.length === 0) {
      this.renderMarkers(this.map);
    } else {
      this.updateMarkers();
    }
  }

  renderMarkers (map) {
    let markers = [];
    this.props.places.forEach(place => {
      const isActivePlace = (place === this.props.activePlace);
      const position = place.position;
      const title = place.name;
      const id = place.id;
      const marker = new google.maps.Marker({
        position: position,
        title: title,
        map: map,
        icon: this.makeIcon(isActivePlace),
        id: id
      });
      marker.place = place;
      marker.addListener('click', () => {
        this.props.setActivePlace(place);
      });
      if (isActivePlace) {
        this.populateInfoWindow(marker);
      }
      markers.push(marker);
    });
    this.setState({ markers: markers });
  }

  updateMarkers () {
    const placeNames = this.props.places.map(place => place.name);
    this.state.markers.forEach(marker => {
      if (placeNames.includes(marker.title)) {
        marker.setMap(this.map);
      } else {
        marker.setMap(null);
      }
      if (marker.place === this.props.activePlace) {
        marker.setIcon(this.makeIcon(true));
      } else {
        marker.setIcon(this.makeIcon(false));
      }
    });
  }

  makeIcon (isActive) {
    let markerColor = isActive ? this.markerColor.active : this.markerColor.initial;
    const markerImage = new google.maps.MarkerImage(
      `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|${markerColor}|40|_|%E2%80%A2`,
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21, 34));
    return markerImage;
  }

  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    this.renderMap();
    if (this.props.activePlace) {
      this.populateInfoWindow();
    }
    return (
      <div aria-label='map' role='application' ref={this.mapDiv} style={{width: 500, height: 500}} />
    );
  }
}

export default MapContainer;
