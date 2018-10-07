import React, { Component } from 'react';
import { StyledList } from './Styles.js';

class List extends Component {
  render () {
    const { places, setActivePlace } = this.props;

    return (
      <StyledList aria-label='list of bars' role='listbox'>
        {places.map(place => (
          <li key={place.id}>
            <button
              onClick={() => {
                setActivePlace(place);
                this.props.toggleMenu();
              }}
            >
              {place.name}
            </button>
          </li>
        ))}
      </StyledList>
    );
  }
}

export default List;
