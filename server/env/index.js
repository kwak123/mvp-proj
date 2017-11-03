module.exports = {
  BASE_URL:        'https://swapi.co/api/',
  PLANETS:         'planets/',
  STARSHIPS:       'starships/',
  PEOPLE:          'people/',
  SPECIES:         'species/',
  getPlanetsUrl:   (pageNum = 1) => module.exports.BASE_URL + module.exports.PLANETS   + `?page=${pageNum}`,
  getStarshipsUrl: (pageNum = 1) => module.exports.BASE_URL + module.exports.STARSHIPS + `?page=${pageNum}`,
  getPeopleUrl:    (pageNum = 1) => module.exports.BASE_URL + module.exports.PEOPLE    + `?page=${pageNum}`,
  getSpeciesUrl:   (pageNum = 1) => module.exports.BASE_URL + module.exports.SPECIES   + `?page=${pageNum}`  
};