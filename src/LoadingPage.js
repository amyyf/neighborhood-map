import React, { Component } from 'react';

class LoadingPage extends Component {
  render () {
    if (this.props.isLoaded) {
      return null;
    }
    return (
      <h1>Loading</h1>
    );
  }
}

export default LoadingPage;
