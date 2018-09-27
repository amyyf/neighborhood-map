/* global google fetch */

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
    const venueId = this.state.activeMarker.id;
    let address, description, name, priceTier, rating, url;
    this.infoWindow.open(this.map, this.state.activeMarker);
    fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=SGZY43FDX4VZT0TPOSG55DMSI42CTGXCX4ENULJQ1HE4L2EY&client_secret=MX5RBBSUOTGVL1ZLTYL1ZWUDE1NKDTMKN4FIKI3U53NGH05M&v=20180922`)
      .then(results => results.json())
      .then(response => {
        address = response.response.venue.location.address;
        description = response.response.venue.description;
        name = response.response.venue.name;
        priceTier = response.response.venue.price.tier;
        rating = response.response.venue.rating;
        url = response.response.venue.url;
        console.log(response);
        this.infoWindow.setContent(`
          ${name}
          ${address}
          ${description}
          ${priceTier}
          ${rating}
          ${url}
          `);
      })
      .catch(e => {
        this.infoWindow.setContent(`
          ${this.state.activeMarker.title}
          There was an error retrieving additional data.
          `);
        console.log(e);
      });
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
