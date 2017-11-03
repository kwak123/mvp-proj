var request = require('request');
var handler = require('./api/SwapiHandler');
var environment = require('./game/Environment');

// Fetch first round of planets and stuff initially
let initPlanets = () => {
  handler.fetchPlanets(1)
    .then((data) => {
      environment.PLANETS = JSON.parse(data).results;
    }); 
};

let initStarships = () => {
  handler.fetchStarships(1)
    .then((data) => {
      environment.STARSHIPS = JSON.parse(data).results;
    });
};

let initPeople = () => {
  handler.fetchPeople(1)
    .then((data) => {
      environment.PEOPLE = JSON.parse(data).results;
    });
};

let initSpecies = () => {
  handler.fetchSpecies(1)
    .then((data) => {
      environment.SPECIES = JSON.parse(data).results;
    })
}

exports.initPlanets = initPlanets;
exports.initStarships = initStarships;
exports.initPeople = initPeople;
exports.initSpecies = initSpecies;