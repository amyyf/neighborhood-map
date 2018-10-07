import React, { Component } from 'react';
import { StyledList } from './Styles.js';

class List extends Component {
  render () {
    const { places, setActivePlace } = this.props;

    return (
      <StyledList aria-label='list of bars'>
        {places.map(place => (
          <li key={place.id} tabIndex='0' onClick={() => {
            setActivePlace(place);
            this.props.toggleMenu();
          }}>{place.name}</li>
        ))}
      </StyledList>
    );
  }
}

export default List;
