import React, { Component } from 'react';

class Filter extends Component {
  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    return (
      <input type='text' />
    );
  }
}

export default Filter;