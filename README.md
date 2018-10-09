# Neighborhood Map

Many people come to New York City to learn about its history. Many people also like to drink beer. Here's a list of ten places in New York where you can do both of those things at the same time.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It is hosted [on my website](https://amyfrieson.com/neighborhood-map/), if you just want to look at it.

Otherwise, clone or download the project, `cd` into the project directory, and run:

#### `npm install`
#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can alternatively run:

#### `npm run build`

to deploy the production build of the app. Create-React-App recommends serving the production build with:

#### `npm install -g serve`
#### `serve -s build`

This project utilizes a service worker from Create-React-App that ONLY works in the production build.

## Dependencies and resources

APIs and libraries:
- [Foursquare's API](https://developer.foursquare.com/docs/terms-of-use/attribution) to get additional place data for the venues
- [GoogleMaps's API](https://developers.google.com/maps/documentation/) for the map
- [Styled Components](https://www.styled-components.com/) for cleanly blending CSS with React

I referred to [Cuneyt Aliustaoglu's article](http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/) for tips on using Google Maps with React without using custom libraries.

I modified code from [Udacity's course](https://github.com/udacity/ud864/blob/master/Project_Code_5_BeingStylish.html) on working with Google Maps API to change the color of my active marker.

My custom map markers and favicon were created by [Steven Frieson](http://stevenfrieson.com/).

### Project Instructions from Udacity

You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.
