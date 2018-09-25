/* global google */

import React, { Component } from 'react';

class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.mapDiv = React.createRef();
  }

  componentDidMount () {
    const mapDiv = this.mapDiv.current;
    const map = new google.maps.Map(mapDiv, {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    });
    this.renderMarkers(map);
  }

  renderMarkers (map) {
    const { places } = this.props;
    const markers = [];
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
  }

  render () {
    return (
      <div ref={this.mapDiv} style={{width: 500, height: 500}} />
    );
  }
}

export default MapContainer;
