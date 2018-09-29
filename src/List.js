import React, { Component } from 'react';

class List extends Component {
  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    const { places, setActivePlace } = this.props;

    return (
      <div>
        <ul>
          {places.map(place => (
            <li key={place.id} onClick={() => setActivePlace(place)}>{place.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
