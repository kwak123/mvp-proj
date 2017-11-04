var request = require('request');
var params = require('../env');
var testData = require('../test/exampleData');

/**
 * Helper class that returns Promises of API data
 */
module.exports = {
  fetchPlanets: (pageNum = 1) => {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(testData.planets));
      // request.get(params.getPlanetsUrl(pageNum))
      //   .on('response', (response) => {
      //     let cache = '';
      //     response.on('data', (data) => cache += data);
      //     response.on('end', () => resolve(cache.toString()));
      //   })
      //   .on('error', reject);
    });
  },

  fetchStarships: (pageNum = 1) => {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(testData.starships));
      // request.get(params.getStarshipsUrl(pageNum))
      //   .on('response', (response) => {
      //     let cache = '';
      //     response.on('data', (data) => cache += data);
      //     response.on('end', () => resolve(cache.toString()));
      //   })
      //   .on('error', reject);
    });
  },

  fetchPeople: (pageNum = 1) => {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(testData.people));
      // request.get(params.getPeopleUrl(pageNum))
      //   .on('response', (response) => {
      //     let cache = '';
      //     response.on('data', (data) => cache += data);
      //     response.on('end', () => resolve(cache.toString()));
      //   })
      //   .on('error', reject);
    });
  },

  fetchSpecies: (pageNum = 1) => {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(testData.species));
      // request.get(params.getSpeciesUrl(pageNum))
      //   .on('response', (response) => {
      //     let cache = '';
      //     response.on('data', (data) => cache += data);
      //     response.on('end', () => resolve(cache.toString()));
      //   })
      //   .on('error', reject);
    });
  }
}