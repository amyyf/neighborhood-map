import React, { Component } from 'react';

class Filter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    };

    this.filterPlaces = this.filterPlaces.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  filterPlaces () {
    console.log(this.state.value);
    // this.props.places.map()
  }

  setValue (event) {
    this.setState({ value: event.target.value }, this.filterPlaces);
  }

  render () {
    if (!this.props.isLoaded) {
      return null;
    }
    return (
      <input type='text' value={this.state.value} onChange={this.setValue} />
    );
  }
}

export default Filter;
