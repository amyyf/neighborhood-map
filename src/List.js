import React, { Component } from 'react';

class List extends Component {
  render () {
    const { places } = this.props;

    return (
      <div>
        <ul>
          {places.map(place => (
            <li key={place.id}>{place.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
