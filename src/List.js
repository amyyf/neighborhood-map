import React, { Component } from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  color: purple;
`;

class List extends Component {
  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    const { places, setActivePlace } = this.props;

    return (
      <StyledList aria-label='list of bars'>
        {places.map(place => (
          <li key={place.id} onClick={() => setActivePlace(place)}>{place.name}</li>
        ))}
      </StyledList>
    );
  }
}

export default List;
