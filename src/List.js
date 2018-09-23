import React, { Component } from 'react';

class List extends Component {
  render () {
    const { places } = this.props;

    return (
      <ul>
        {places.map(place => (
          <li key={place.id}>{place.name}</li>
        ))}
      </ul>
    );
  }
}

export default List;
