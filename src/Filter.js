import React, { Component } from 'react';

class Filter extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    const value = event.target.value;
    this.props.setFilterValue(value);
  }

  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    return (
      <input type='text' value={this.props.value} onChange={this.handleChange} />
    );
  }
}

export default Filter;
