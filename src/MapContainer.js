/* global google */

import React, { Component } from 'react';
import styled from 'styled-components';

const StyledMapDiv = styled.div`
  height: calc(100% - 3em);

  > div {
    height: 100%;
  }

  @media screen and (min-width: 850px) {
    height: 100%;
  }
`;

class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.infoWindow = new google.maps.InfoWindow({
      maxWidth: 250
    });
    this.infoWindow.addListener('closeclick', () => this.props.setActivePlace(null));
    this.map = null;
    this.mapDiv = React.createRef();
    this.markerColor = {
      active: 'FFFF24',
      initial: '0091ff'
    };
    this.state = {
      isDesktop: window.innerHeight > 850,
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
      <br>
      <br>
      <img src='./powered-by-foursquare-grey.png' alt='powered by foursquare' href='https://foursquare.com/' width=200 />
    `);
  }

  renderMap (mapDiv) {
    if (!mapDiv) {
      return;
    }
    if (!this.map) {
      const map = new google.maps.Map(mapDiv, {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 15,
        styles: [
          {'elementType': 'labels.text.fill', 'stylers': [{'color': '#4d4b35'}]},
          {'elementType': 'labels.text.stroke', 'stylers': [{'color': '#f2e4e1'}]},
          {
            'featureType': 'water',
            'stylers': [
              { 'color': '#b4c6b7' }
            ]
          },
          {
            'featureType': 'road.highway',
            'stylers': [
              { 'color': '#725244' },
              { 'lightness': 50 }
            ]
          },
          {
            'featureType': 'road.arterial',
            'stylers': [
              { 'color': '#8c756b' },
              { 'lightness': 50 }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.icon',
            'stylers': [
              { 'visibility': 'off' }
            ]
          },
          {
            'featureType': 'poi.park',
            'stylers': [
              { 'color': '#bab89f' },
              { 'lightness': 25 }
            ]
          },
          {
            'featureType': 'landscape.man_made',
            'stylers': [
              { 'color': '#c2af8a' },
              { 'saturation': -25 },
              { 'lightness': 50 }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.icon',
            'stylers': [
              { 'visibility': 'off' }
            ]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
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
    let bounds = new google.maps.LatLngBounds();
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
      bounds.extend(marker.position);
      markers.push(marker);
    });
    map.fitBounds(bounds);
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
    const icons = {
      active: './beer-mug_full.png',
      notActive: './beer-mug_empty.png'
    };
    return isActive ? icons.active : icons.notActive;
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
      <StyledMapDiv>
        <div aria-label='map' role='application' ref={this.mapDiv} />
      </StyledMapDiv>
    );
  }
}

export default MapContainer;
