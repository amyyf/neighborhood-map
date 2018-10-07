import React, { Component } from 'react';
import { StyledList, ListButton } from './Styles.js';

class List extends Component {
  render () {
    const { places, setActivePlace } = this.props;

    return (
      <StyledList aria-label='list of bars' role='listbox'>
        {places.map(place => (
          <li key={place.id}>
            <ListButton
              onClick={() => {
                setActivePlace(place);
                this.props.toggleMenu();
              }}
            >
              {place.name}
            </ListButton>
          </li>
        ))}
      </StyledList>
    );
  }
}

export default List;
