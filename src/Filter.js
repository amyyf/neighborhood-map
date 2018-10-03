import React, { Component } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  color: blue;
`;

class Filter extends Component {
  constructor (props) {
    super(props);
    this.radios = [
      {tier: '0', name: 'All'},
      {tier: '1', name: '$'},
      {tier: '2', name: '$$'},
      {tier: '3', name: '$$$'},
      {tier: '4', name: '$$$$'}
    ];
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (event) {
    let value = event.target.value;
    // value from radio should be a number
    if (event.target.type === 'radio') {
      value = parseInt(value, 10);
    }
    this.props.setFilterValue(value);
  }

  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    return (
      <StyledForm>
        <label>
          Filter by name:
          <input type='text' value={this.props.value} onChange={this.handleInputChange} />
        </label>
        <label>
          Filter by price:
          {this.radios.map(radio => {
            return (
              <label key={'radio' + radio.tier}>
                {radio.name}
                <input type='radio' value={radio.tier} name='priceRadio' onChange={this.handleInputChange} />
              </label>
            );
          })}
        </label>
      </StyledForm>
    );
  }
}

export default Filter;

// checkboxes exist in state - whether checked or not
// if they are an array, I can loop over them to render
// they have a handleCheck method to extract their value, which is passed up to the app filter
// app filter needs to know how to handle this value - maybe differently than the text filter
// but it can still use the same filterPlaces function to render the relevant places
// maybe pass in input type (or source) to filterValue function to pass along to filterPlaces
