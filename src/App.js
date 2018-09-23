import React, { Component } from 'react';
import './App.css';
import List from './List.js';
import MapContainer from './MapContainer.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      places: [
        {
          name: 'Fraunces Tavern',
          id: '507f06e9e4b0d2368fcbada4',
          lat: '40.70352594119276',
          lng: '-74.01139528322373'
        },
        {
          name: 'Ear Inn',
          id: '3fd66200f964a52071e61ee3',
          lat: '40.726083607871615',
          lng: '-74.00948307272056'
        },
        {
          name: 'McSorley\'s Old Ale House',
          id: '3fd66200f964a52058e41ee3',
          lat: '40.728602348741525',
          lng: '-73.98996152288103'
        },
        {
          name: 'Julius\'',
          id: '3fd66200f964a520efe61ee3',
          lat: '40.73449699128521',
          lng: '-74.00147997860874'
        },
        {
          name: 'White Horse Tavern',
          id: '3fd66200f964a52039eb1ee3',
          lat: '40.73568541965826',
          lng: '-74.00594379881144'
        },
        {
          name: 'Old Town Bar',
          id: '3fd66200f964a52067e91ee3',
          lat: '40.737537',
          lng: '-73.989302'
        },
        {
          name: 'P.J. Clarke\'s',
          id: '3fd66200f964a520fbe71ee3',
          lat: '40.758937738691245',
          lng: '-73.96846225850372'
        },
        {
          name: 'Bemelmans Bar',
          id: '3fd66200f964a520cdea1ee3',
          lat: '40.77460663060093',
          lng: '-73.96330814709152'
        },
        {
          name: 'Landmark Tavern',
          id: '3fd66200f964a5208be81ee3',
          lat: '40.763350703245884',
          lng: '-73.99647202623504'
        },
        {
          name: 'Pete\'s Tavern',
          id: '3fd66200f964a52068e31ee3',
          lat: '40.73645856380347',
          lng: '-73.98689116651353'
        }
      ]
    };
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Ten of NYC's Oldest Bars</h1>
        </header>
        <main>
          <List places={this.state.places} />
          <MapContainer />
        </main>
      </div>
    );
  }
}

export default App;
