/* global fetch */

import React, { Component } from 'react';
import './App.css';
import Filter from './Filter.js';
import List from './List.js';
import LoadingPage from './LoadingPage.js';
import MapContainer from './MapContainer.js';
import ErrorPage from './ErrorPage.js';
import { StyledApp, StyledMain, StyledMenu, StyledMenuButton, StyledHeader, StyledSection } from './Styles.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.getPlaces = this.getPlaces.bind(this);
    this.setActivePlace = this.setActivePlace.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      activePlace: null,
      filterValue: '',
      filteredPlaces: [],
      isErrored: false,
      isGoogleLoaded: 'google' in window,
      isFoursquareLoaded: false,
      isMenuOpen: false,
      places: []
    };
    window.addEventListener('error', () => {
      this.setState({ isErrored: true });
    });
    window.gm_authFailure = () => {
      this.setState({ isErrored: true });
    };
    if (!('google' in window)) {
      window.isGoogleLoaded = () => {
        this.setState({ isGoogleLoaded: true });
      };
    }
  }

  componentDidMount () {
    this.getPlaces()
      .then((places) => {
        let promises = [];
        for (let i = 0; i < places.length; i++) {
          const id = places[i].id;
          promises.push(this.getFoursquareData(places[i], id));
        }
        return Promise.all(promises);
      })
      .then((places) => this.setState({ isFoursquareLoaded: true, places: places, filteredPlaces: places }));
  }

  getPlaces () {
    return fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        return data.places;
      })
      .catch((e) => this.setState({ isErrored: true }));
  }

  getFoursquareData (place, venueId) {
    return fetch(
      `https://api.foursquare.com/v2/venues/${venueId}?client_id=SGZY43FDX4VZT0TPOSG55DMSI42CTGXCX4ENULJQ1HE4L2EY&client_secret=MX5RBBSUOTGVL1ZLTYL1ZWUDE1NKDTMKN4FIKI3U53NGH05M&v=20180922`
    )
      .then(results => results.json())
      .then(response => {
        const address = response.response.venue.location.address;
        const description = response.response.venue.description;
        const priceTier = response.response.venue.price.tier;
        const rating = response.response.venue.rating;
        const url = response.response.venue.url;
        place.address = address;
        place.description = description;
        place.priceTier = priceTier;
        place.rating = rating;
        place.url = url;
        return place;
      })
      .catch(e => {
        this.setState({ isErrored: true });
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
    this.setState({ filteredPlaces: this.state.places }); // resets default list in order to filter
    let filteredArr;
    if (typeof this.state.filterValue === 'string') {
      filteredArr = this.state.places.filter(place => place.name.toLowerCase().includes(this.state.filterValue));
    } else if (typeof this.state.filterValue === 'number') {
      filteredArr = this.state.places.filter(place => place.priceTier === this.state.filterValue);
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
        {this.state.isErrored && <ErrorPage />}
        {!this.state.isErrored && <StyledMain>
          {(this.state.isGoogleLoaded && this.state.isFoursquareLoaded)
            ? (
              <React.Fragment>
                <StyledSection aria-label='filter the list of bars by name or price'>
                  <StyledMenuButton onClick={this.toggleMenu}>
                    {this.state.isMenuOpen ? 'HIDE' : 'SHOW'} FILTER MENU
                  </StyledMenuButton>
                  <StyledMenu open={this.state.isMenuOpen}>
                    <Filter
                      setFilterValue={this.setFilterValue}
                      value={this.state.filterValue}
                    />
                    <List
                      places={this.state.filteredPlaces}
                      setActivePlace={this.setActivePlace}
                      toggleMenu={this.toggleMenu}
                    />
                  </StyledMenu>
                </StyledSection>
                <MapContainer
                  activePlace={this.state.activePlace}
                  places={this.state.filteredPlaces}
                  setActivePlace={this.setActivePlace}
                />
              </React.Fragment>
            )
            : <LoadingPage />
          }
        </StyledMain>}
      </StyledApp>
    );
  }
}

export default App;
