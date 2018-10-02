import React, { Component } from 'react';

class Filter extends Component {
  constructor (props) {
    super(props);
    this.checkboxes = ['tier1', 'tier2', 'tier3', 'tier4'];
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleCheckboxChange (event) {
    console.log('clicked: ' + event.target.value);
  }

  handleInputChange (event) {
    const value = event.target.value;
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
          {this.checkboxes.map(checkbox => {
            const num = checkbox.slice(4);
            return (
              <input type='checkbox' value={num} key={'checkbox' + num} onChange={this.handleCheckboxChange} />
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
