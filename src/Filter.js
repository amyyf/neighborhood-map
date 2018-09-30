import React, { Component } from 'react';

class Filter extends Component {
  // filterPlaces () {
  //   console.log(this.state.value);
  //   // this.props.places.map()
  // }
  //
  // setValue (event) {
  //   this.setState({ value: event.target.value }, this.filterPlaces);
  // }

  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    return (
      <input type='text' value={this.props.value} onChange={this.props.setFilterValue} />
    );
  }
}

export default Filter;
