# Neighborhood Map

Many people come to New York City to learn about its history. Many people also like to drink beer. Here's a list of ten places in New York where you can do both of those things at the same time.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Dependencies and resources

APIs and libraries:
- [Foursquare's API](https://developer.foursquare.com/docs/terms-of-use/attribution) to get additional place data for the venues
- [GoogleMaps's API](https://developers.google.com/maps/documentation/) for the map
- [Styled Components](https://www.styled-components.com/) for cleanly blending CSS with React

I referred to [Cuneyt Aliustaoglu's article](http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/) for tips on using Google Maps with React without using custom libraries.

I modified code from [Udacity's course](https://github.com/udacity/ud864/blob/master/Project_Code_5_BeingStylish.html) on working with Google Maps API to change the color of my active marker.

My custom map markers and favicon were created by [Steven Frieson](stevenfrieson.com).

### Project Instructions from Udacity

You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

#### Places & Foursquare venue IDs / lat-longs
1. Fraunces Tavern - 507f06e9e4b0d2368fcbada4, "lat": 40.70352594119276, "lng": -74.01139528322373
2. Ear Inn - 3fd66200f964a52071e61ee3, "lat": 40.726083607871615, "lng": -74.00948307272056
3. McSorley's Old Ale House - 3fd66200f964a52058e41ee3, "lat": 40.728602348741525, "lng": -73.98996152288103
4. Julius' - 3fd66200f964a520efe61ee3, "lat": 40.73449699128521, "lng": -74.00147997860874
5. White Horse Tavern - 3fd66200f964a52039eb1ee3, "lat": 40.73568541965826, "lng": -74.00594379881144
6. Old Town Bar - 3fd66200f964a52067e91ee3, "lat": 40.737537, "lng": -73.989302
7. P.J. Clarke's - 3fd66200f964a520fbe71ee3, "lat": 40.758937738691245, "lng": -73.96846225850372
8. Bemelmans Bar - 3fd66200f964a520cdea1ee3, "lat": 40.77460663060093, "lng": -73.96330814709152
9. Landmark Tavern - 3fd66200f964a5208be81ee3, "lat": 40.763350703245884, "lng": -73.99647202623504
10. Pete's Tavern - 3fd66200f964a52068e31ee3, "lat": 40.73645856380347, "lng": -73.98689116651353
request URL:  https://api.foursquare.com/v2/venues/VENUEID?client_id=ID&client_secret=SECRET&v=20180922
