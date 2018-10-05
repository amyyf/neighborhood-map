import React, { Component } from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  color: #645c56;
  font-family: 'Josefin Slab',serif;
  list-style: none;
  font-size: 1.25em;
  margin: 0;
  padding: 0.5em;
  display: flex;
  flex-flow: row wrap;

  > li {
    padding: 0.25em;
    letter-spacing: -0.01em;
  }

  > li::after {
    content: ' |';
  }

  > li:hover {
    background-color: white;
    color: black;
  }
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
          <li key={place.id} onClick={() => {
            setActivePlace(place);
            this.props.toggleMenu();
          }}>{place.name}</li>
        ))}
      </StyledList>
    );
  }
}

export default List;
