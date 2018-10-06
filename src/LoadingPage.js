import React, { Component } from 'react';

class LoadingPage extends Component {
  render () {
    if (this.props.isLoaded) {
      return null;
    }
    return (
      <React.Fragment>
        <h1>Loading</h1>
        <p>There may be an issue with the network connection.</p>
        <p>Try reloading this page or checking your connection speed.</p>
      </React.Fragment>
    );
  }
}

export default LoadingPage;
