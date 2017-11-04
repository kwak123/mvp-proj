var request = require('request');
var handler = require('./api/SwapiHandler');
var environment = require('./game/Environment');

// Fetch first round of planets and stuff initially
let initPlanets = () => {
  handler.fetchPlanets(1)
    .then((data) => {
      let parsed = JSON.parse(data).results;
      let pruned = parsed.map((a) => {
        return {
          climate: a.climate,
          diameter: a.diameter,
          name: a.name
        };
      });
      environment.PLANETS = pruned;
    }); 
};

let initStarships = () => {
  handler.fetchStarships(1)
    .then((data) => {
      let parsed = JSON.parse(data).results;
      let pruned = parsed.filter((a) => a.cost_in_credits !== 'unknown')
        .map((a) => {
          return {
            length: a.length, 
            hyperdrive: a.hyperdrive_rating,
            cost: a.cost_in_credits,
            mglt: a.MGLT,
            name: a.name
          };
        });
      environment.STARSHIPS = pruned;
    });
};

let initPeople = () => {
  handler.fetchPeople(1)
    .then((data) => {
      let parsed = JSON.parse(data).results;
      let pruned = parsed.map((a) => {
        return {
          name: a.name
        };
      });
      environment.PEOPLE = JSON.parse(data).results;
    });
};

let initSpecies = () => {
  handler.fetchSpecies(1)
    .then((data) => {
      let parsed = JSON.parse(data).results;
      let pruned = parsed.map((a) => {
        return {
          name: a.name,
          classification: a.classification
        };
      });
      environment.SPECIES = JSON.parse(data).results;
    })
}

exports.initPlanets = initPlanets;
exports.initStarships = initStarships;
exports.initPeople = initPeople;
exports.initSpecies = initSpecies;