var request = require('request');
var handler = require('./api/SwapiHandler');
var environment = require('./game/Environment');

// Fetch first round of planets and stuff initially
let initPlanets = (pageNum = 1) => {
  handler.fetchPlanets(pageNum)
    .then((data) => {
      let newData = JSON.parse(data)
      let parsed = newData.results;
      let pruned = parsed.map((a) => {
        return {
          climate: a.climate,
          diameter: a.diameter,
          name: a.name
        };
      });
      environment.PLANETS = environment.PLANETS.concat(pruned);
      if (newData.next !== null) {
        pageNum++;
        handler.fetchPlanets(pageNum);
      }
    }); 
};

let initStarships = (pageNum = 1) => {
  handler.fetchStarships(pageNum)
    .then((data) => {
      let newData = JSON.parse(data)
      let parsed = newData.results;
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
      environment.STARSHIPS = environment.STARSHIPS.concat(pruned);
      environment.STARSHIPS.sort((a, b) => a.cost - b.cost);
      if (newData.next !== null) {
        pageNum++;
        handler.fetchStarships(pageNum);
      }
    });
};

let initPeople = (pageNum = 1) => {
  handler.fetchPeople(pageNum)
    .then((data) => {
      let newData = JSON.parse(data)
      let parsed = newData.results;
      let pruned = parsed.map((a) => {
        return {
          name: a.name
        };
      });
      environment.PEOPLE = environment.PEOPLE.concat(pruned);
      if (newData.next !== null) {
        pageNum++;
        handler.fetchPeople(pageNum);
      }
    });
};

let initSpecies = (pageNum = 1) => {
  handler.fetchSpecies(pageNum)
    .then((data) => {
      let newData = JSON.parse(data)
      let parsed = newData.results;
      let pruned = parsed.map((a) => {
        return {
          name: a.name,
          classification: a.classification
        };
      });
      environment.SPECIES = environment.SPECIES.concat(pruned);
      if (newData.next !== null) {
        pageNum++;
        handler.fetchSpecies(pageNum);
      }
    });
}

exports.initPlanets = initPlanets;
exports.initStarships = initStarships;
exports.initPeople = initPeople;
exports.initSpecies = initSpecies;