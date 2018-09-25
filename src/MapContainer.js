/* global google */

import React, { Component } from 'react';
import InfoWindow from './InfoWindow.js';

class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.mapDiv = React.createRef();
    this.infoWindow = React.createRef();
    this.state = {
      map: {},
      markers: []
    };
  }

  componentDidMount () {
    const mapDiv = this.mapDiv.current;
    this.renderMap(mapDiv);
  }

  // populateInfoWindow (event) {
  //   const infowindow = new google.maps.InfoWindow();
  //   const marker = event.target;
  //   const map = this.mapDiv.current;
  //   const window = this.infoWindow.current;
  //   console.log(marker);
  //   infowindow.setContent('open');
  //   infowindow.open(map, marker);
  // }

  renderMap (mapDiv) {
    const map = new google.maps.Map(mapDiv, {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 12
    });
    this.setState({ map: map });
    this.renderMarkers(map);
  }

  renderMarkers (map) {
    const { places } = this.props;
    let markers = [];
    for (let i = 0; i < places.length; i++) {
      const position = places[i].position;
      const title = places[i].name;
      const marker = new google.maps.Marker({
        position: position,
        title: title,
        map: map,
        animation: google.maps.Animation.DROP,
        id: i
      });
      markers.push(marker);
    }
    this.setState({ markers: markers });
  }

  render () {
    /* TODO infowindow - listen for event bubbling on container, target element (which is the marker) and populate infowindow */

    return (
      <div ref={this.mapDiv} onClick={this.populateInfoWindow} style={{width: 500, height: 500}}>
        <InfoWindow ref={this.infoWindow} />
      </div>
    );
  }
}

export default MapContainer;
