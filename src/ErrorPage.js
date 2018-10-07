import React, { Component } from 'react';
import { ErrorMsg } from './Styles.js';

class ErrorPage extends Component {
  render () {
    return (
      <ErrorMsg>
        <h2>Sorry, something went wrong with Foursquare. You can try refreshing the page or check back later for some bar history.</h2>
      </ErrorMsg>
    );
  }
}

export default ErrorPage;
