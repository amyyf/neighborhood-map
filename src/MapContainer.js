/* global google fetch */

import React, { Component } from 'react';

class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.mapDiv = React.createRef();
    this.infoWindow = new google.maps.InfoWindow();
    this.map = null;
  }

  componentDidMount () {
    const mapDiv = this.mapDiv.current;
    this.renderMap(mapDiv);
  }

  populateInfoWindow () {
    const venueId = this.props.activeMarker.id;
    let address, description, name, priceTier, rating, url;
    this.infoWindow.open(this.map, this.props.activeMarker);
    fetch(
      // `https://api.foursquare.com/v2/venues/${venueId}?client_id=SGZY43FDX4VZT0TPOSG55DMSI42CTGXCX4ENULJQ1HE4L2EY&client_secret=MX5RBBSUOTGVL1ZLTYL1ZWUDE1NKDTMKN4FIKI3U53NGH05M&v=20180922`
    )
      .then(results => results.json())
      .then(response => {
        console.log(response);
        address = response.response.venue.location.address;
        // TODO handle undefined description
        description = response.response.venue.description;
        name = response.response.venue.name;
        // TODO display # of dollar signs for price tier
        priceTier = response.response.venue.price.tier;
        rating = response.response.venue.rating;
        url = response.response.venue.url;
        this.infoWindow.setContent(`
          <h3>${name}</h3>
          <h4>${address}</h4>
          <p>${description}</p>
          <p>Price: ${priceTier}</p>
          <p>Rating: ${rating} / 10</p>
          <a href='${url}'>Website</a>
          `);
      })
      .catch(e => {
        this.infoWindow.setContent(`
          <h3>${this.props.activeMarker.title}</h3>
          <p>There was an error retrieving additional data.</p>
          `);
        console.log(e);
      });
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
        id: id
      });
      marker.addListener('click', () => this.props.setActiveMarker(marker.title));
      this.props.markers.push(marker);
    });
  }

  render () {
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
