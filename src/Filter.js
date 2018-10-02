import React, { Component } from 'react';

class Filter extends Component {
  constructor (props) {
    super(props);
    this.radios = ['tier0', 'tier1', 'tier2', 'tier3', 'tier4'];
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (event) {
    let value = event.target.value;
    // value from radio should remain type number
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
      <React.Fragment>
        <label>
          Filter by name:
          <input type='text' value={this.props.value} onChange={this.handleInputChange} />
        </label>
        <label>
          Filter by price:
          {this.radios.map(radio => {
            const num = radio.slice(4);
            return (
              <input type='radio' value={num} key={'radio' + num} name='priceRadio' onChange={this.handleInputChange} />
            );
          })}
        </label>
      </React.Fragment>
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
