var app = require('express')();
var http = require('http');
var bodyparser = require('body-parser');
var request = require('request');

var handler = require('./api/SwapiHandler');
var environment = require('./game/Environment');
var initialize = require('./initialize');
var Game = require('./game/Game');
// var io = require('socket.io')() - someday

// Default headers
const HEADER = {
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
};

// Custom logger
let logger = (req, res, next) => {
  console.log(`received ${req.method} request at ${req.originalUrl}`);
  next();
}

// ACAO headers for some requests
let xHeader = (req, res, next) => {
  res.set(HEADER);
  next();
}

// Middleware
app.use(logger);
app.use(bodyparser.json());

// app.use(express.static(path.resolve(__dirname, './client))); DO THIS LATER

// Handle server startup
if (environment.PLANETS.length === 0)   { initialize.initPlanets(); }
if (environment.STARSHIPS.length === 0) { initialize.initStarships(); }
if (environment.PEOPLE.length === 0)    { initialize.initPeople(); }
if (environment.SPECIES.length === 0)   { initialize.initSpecies(); }

let game;

// Stupid favicon
app.get('/favicon', (req, res) => res.sendStatus(200));

// GET requests
app.get('/', xHeader, (req, res) => {
  let galaxy = { 
    planets: environment.PLANETS, 
    starships: environment.STARSHIPS, 
    people: environment.PEOPLE,
    species: environment.SPECIES
  };
  res.send(galaxy);
});

app.get('/new', xHeader, (req, res) => {
  let data = {
    generators: [],
    credits: game.player.credits,
    turns: game.turns
  };
  for (let key in game.incomeManager.properties) {
    let holder = {};
    let name = game.incomeManager.properties[key];
    holder.name = name;
    holder.count = game.incomeManager.incomeGenerators[name].count;
    data.generators.push(holder);
  }
  res.send(data);
});

app.get('/player', xHeader, (req, res) => {
  res.sendStatus(200);
});

app.post('/new', xHeader, (req, res) => {
  game = new Game(req.body.username, req.body.species);
  if (req.body.username === 'sam') {
    game.player.credits = 1000000000;
  }
  res.sendStatus(game ? 200 : 400);
});

// Handle saving player some day
app.post('/player', xHeader, (req, res) => {
  res.sendStatus(200);
});

app.post('/purchase', xHeader, (req, res) => {
  let property = req.body.property;
  let cost = game.incomeManager.fetchCost(property);
  let test = game.spendCredits(-cost);
  if (test) { game.incomeManager.purchase(property); }
  let data = {
    credits: game.player.credits,
    property: property,
    count: game.incomeManager.incomeGenerators[property].count,
    successful: test
  };
  res.send(data);
});

app.post('/runtick', xHeader, (req, res) => {
  game.calculateTick();
  res.send({
    credits: game.player.credits,
    turns: game.turns
  });
});

app.options('/*', xHeader, (req, res) => {
  res.sendStatus(200);
});

app.listen(3001, () => console.log('now listening on 3001'));