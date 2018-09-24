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
  }

  render () {
    return (
      <div ref={this.mapDiv} style={{width: 500, height: 500}} />
    );
  }
}

export default MapContainer;
