import React, { Component } from 'react';
import { StyledForm } from './Styles.js';

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
                <input type='radio' value={radio.tier} name='priceRadio' onChange={this.handleInputChange} />
                {radio.name}
              </label>
            );
          })}
        </label>
      </StyledForm>
    );
  }
}

export default Filter;
