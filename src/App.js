/* global fetch */

import React, { Component } from 'react';
import './App.css';
import Filter from './Filter.js';
import List from './List.js';
import LoadingPage from './LoadingPage.js';
import MapContainer from './MapContainer.js';
import styled from 'styled-components';

/* breakpoints:
500width: filter menu display list of places on right, filter options on left as columns; header gets less height
800width: filter menu displays on left instead of center
*/
const StyledApp = styled.div`
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const StyledMain = styled.main`
  height: 75vh;
`;

const StyledMenu = styled.div`
  background-color: #f9f0dc;
  padding: 0.5em;
  position: absolute;
  top: 3em;
  transform: translateY(${props => props.open ? 0 : -100}%);
  transition: transform 0.5s ease-out;
  width: 100vw;
`;

const StyledMenuButton = styled.button`
  background-color: #d4b766;
  border: 1px solid #645c56;
  font-size: 1em;
  font-family: 'Special Elite',cursive;
  height: 3em;
  position: relative;
  z-index: 2;
`;

const StyledHeader = styled.header`
  background-color: #e2cf9f;
  color: black;
  height: 25vh;
  position: relative;
  text-align: center;
  z-index: 5;

  > h1 {
    font-family: 'Special Elite',cursive;
    font-size: 2em;
    margin: 0;
    padding: 0.5em;
    padding-bottom: 0.25em;
  }

  > h2 {
    font-family: 'Josefin Slab', serif;
    font-style: italic;
    margin: 0;
  };
`;

const StyledSection = styled.section`
  color: red;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

class App extends Component {
  constructor (props) {
    super(props);
    this.places = [
      {
        name: 'Fraunces Tavern',
        id: '507f06e9e4b0d2368fcbada4',
        position: {
          lat: 40.70352594119276,
          lng: -74.01139528322373
        },
        yearOpened: 1762
      },
      {
        name: 'Ear Inn',
        id: '3fd66200f964a52071e61ee3',
        position: {
          lat: 40.726083607871615,
          lng: -74.00948307272056
        },
        yearOpened: 1817
      },
      {
        name: 'McSorley\'s Old Ale House',
        id: '3fd66200f964a52058e41ee3',
        position: {
          lat: 40.728602348741525,
          lng: -73.98996152288103
        },
        yearOpened: 1854
      },
      {
        name: 'Julius\'',
        id: '3fd66200f964a520efe61ee3',
        position: {
          lat: 40.73449699128521,
          lng: -74.00147997860874
        },
        yearOpened: 1867
      },
      {
        name: 'White Horse Tavern',
        id: '3fd66200f964a52039eb1ee3',
        position: {
          lat: 40.73568541965826,
          lng: -74.00594379881144
        },
        yearOpened: 1880
      },
      {
        name: 'Old Town Bar',
        id: '3fd66200f964a52067e91ee3',
        position: {
          lat: 40.737537,
          lng: -73.989302
        },
        yearOpened: 1892
      },
      {
        name: 'P.J. Clarke\'s',
        id: '3fd66200f964a520fbe71ee3',
        position: {
          lat: 40.758937738691245,
          lng: -73.96846225850372
        },
        yearOpened: 1884
      },
      {
        name: 'Bemelmans Bar',
        id: '3fd66200f964a520cdea1ee3',
        position: {
          lat: 40.77460663060093,
          lng: -73.96330814709152
        },
        yearOpened: 1947
      },
      {
        name: 'Landmark Tavern',
        id: '3fd66200f964a5208be81ee3',
        position: {
          lat: 40.763350703245884,
          lng: -73.99647202623504
        },
        yearOpened: 1868
      },
      {
        name: 'Pete\'s Tavern',
        id: '3fd66200f964a52068e31ee3',
        position: {
          lat: 40.73645856380347,
          lng: -73.98689116651353
        },
        yearOpened: 1864
      }
    ];
    this.setActivePlace = this.setActivePlace.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      activePlace: null,
      filterValue: '',
      filteredPlaces: this.places,
      isLoaded: false,
      isMenuOpen: false
    };
  }

  componentDidMount () {
    let promises = [];
    for (let i = 0; i < this.places.length; i++) {
      const id = this.places[i].id;
      promises.push(this.getFoursquareData(i, id));
    }
    Promise.all(promises)
      .then(() => this.setState({ isLoaded: true }));
  }

  getFoursquareData (arrayEl, venueId) {
    return fetch(
      `https://api.foursquare.com/v2/venues/${venueId}?client_id=SGZY43FDX4VZT0TPOSG55DMSI42CTGXCX4ENULJQ1HE4L2EY&client_secret=MX5RBBSUOTGVL1ZLTYL1ZWUDE1NKDTMKN4FIKI3U53NGH05M&v=20180922`
    )
      .then(results => results.json())
      .then(response => {
        const address = response.response.venue.location.address;
        const description = response.response.venue.description;
        const name = response.response.venue.name;
        const priceTier = response.response.venue.price.tier;
        const rating = response.response.venue.rating;
        const url = response.response.venue.url;
        const place = this.places[arrayEl];
        place.address = address;
        place.description = description;
        place.name = name;
        place.priceTier = priceTier;
        place.rating = rating;
        place.url = url;
      });
  }

  setActivePlace (place) {
    this.setState({ activePlace: place });
  }

  setFilterValue (value) {
    // reset place list if the 'all' radio button is selected
    if (value === 0) {
      this.setState({ filterValue: '' }, this.setFilteredPlaces);
    } else {
      this.setState({ filterValue: value }, this.setFilteredPlaces);
    }
  }

  setFilteredPlaces () {
    this.setState({ filteredPlaces: this.places }); // resets default list in order to filter
    let filteredArr;
    if (typeof this.state.filterValue === 'string') {
      filteredArr = this.places.filter(place => place.name.toLowerCase().includes(this.state.filterValue));
    } else if (typeof this.state.filterValue === 'number') {
      filteredArr = this.places.filter(place => place.priceTier === this.state.filterValue);
    }
    this.setState({ filteredPlaces: filteredArr });
  }

  toggleMenu () {
    this.setState(currentState => ({ isMenuOpen: !currentState.isMenuOpen }));
  }

  render () {
    return (
      <StyledApp>
        <StyledHeader className='App-header'>
          <h1 className='App-title'>Ten of NYC's Oldest Bars</h1>
          <h2>A side of history with your beer?</h2>
        </StyledHeader>
        <StyledMain>
          <LoadingPage isLoaded={this.state.isLoaded} />
          <StyledSection aria-label='filter the list of bars by name or price'>
            <StyledMenuButton onClick={this.toggleMenu}>
              {this.state.isMenuOpen ? 'HIDE' : 'SHOW'} FILTER MENU
            </StyledMenuButton>
            <StyledMenu open={this.state.isMenuOpen}>
              <Filter
                isLoaded={this.state.isLoaded}
                setFilterValue={this.setFilterValue}
                value={this.state.filterValue}
              />
              <List
                isLoaded={this.state.isLoaded}
                places={this.state.filteredPlaces}
                setActivePlace={this.setActivePlace}
                toggleMenu={this.toggleMenu}
              />
            </StyledMenu>
          </StyledSection>
          <MapContainer
            activePlace={this.state.activePlace}
            isLoaded={this.state.isLoaded}
            places={this.state.filteredPlaces}
            setActivePlace={this.setActivePlace}
          />
        </StyledMain>
      </StyledApp>
    );
  }
}

if (navigator.serviceWorker) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('serviceWorkerDev.js').then(function (registration) {
    }).catch(function (error) {
      console.log('sw registration failed with error ', error);
    });
  });
}

export default App;
