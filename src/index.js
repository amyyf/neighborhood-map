import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if (navigator.serviceWorker) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
    }).catch(function (error) {
      console.log('sw registration failed with error ', error);
    });
  });
}
