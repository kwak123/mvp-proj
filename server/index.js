var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');
var request = require('request');
var path = require('path');

var handler = require('./api/SwapiHandler');
var environment = require('./game/Environment');
var initialize = require('./initialize');
var Game = require('./game/Game');
var Ship = require('./game/Ship');
var db = require('./db/config');

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

var app = express();

// Middleware
app.use(logger);
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'dist')));

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
app.get('/galaxy', xHeader, (req, res) => {
  let galaxy = { 
    planets: environment.PLANETS, 
    starships: environment.STARSHIPS, 
    people: environment.PEOPLE,
    species: environment.SPECIES
  };
  res.send(galaxy);
});

app.get('/bundle.js', xHeader, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/bundle.js'));
});

app.get('/new', xHeader, (req, res) => {
  let data = game.fetchData();
  res.send(data);
});

app.get('/player', xHeader, (req, res) => {
  res.sendStatus(200);
});

app.post('/new', xHeader, (req, res) => {
  let planetIdx = Math.floor(Math.random() * environment.PLANETS.length);
  game = new Game(req.body.username, req.body.species, environment.PLANETS[planetIdx]);
  if (req.body.username === 'sam') {
    game.player.credits = 1000000000;
    game.starship.mglt = 1000;
  }
  res.sendStatus(game ? 200 : 400);
});

// Handle saving player some day
app.post('/player', xHeader, (req, res) => {
  res.sendStatus(200);
});

app.post('/starship', xHeader, (req, res) => {
  let newShipName = req.body.name;
  let ship = new Ship(environment.STARSHIPS.find((a) => a.name === newShipName));
  let test = game.spendCredits(-ship.cost);
  if (test) { game.starship = ship; }
  res.send({
    credits: game.player.credits,
    starship: game.starship,
    successful: !!test
  });
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

app.post('/levelup', xHeader, (req, res) => {
  let property = req.body.property;
  let cost = game.incomeManager.fetchLevelUpCost(property);
  let test = game.spendCredits(-cost);
  if (test) { game.incomeManager.levelUp(property); }
  let data = {
    credits: game.player.credits,
    property: property,
    level: game.incomeManager.fetchLevel(property),
    output: game.incomeManager.fetchOutput(property),
    successful: test
  }
  res.send(data);
});

// Would change this to allow for adding hardpoints
app.post('/engine', xHeader, (req, res) => {
  let cost = game.starship.fetchEngineCost();
  let test = game.spendCredits(-cost);
  if (test) { game.starship.levelUpEngine(); }
  res.send({
    credits: game.player.credits,
    starship: game.starship,
    successful: test
  })
});

app.post('/runtick', xHeader, (req, res) => {
  game.calculateTick();
  let finished = false;
  // Only need partial data sent back
  res.send({
    credits: game.player.credits,
    turns: game.turns,
    distance: game.distance,
    finished: game.finished
  });
});

app.options('/*', xHeader, (req, res) => {
  res.sendStatus(200);
});

app.listen(3001, () => console.log('now listening on 3001'));