import React from 'react';
import axios from 'axios';
import NewPlayer from './NewPlayer.jsx';
import Control from './Control.jsx';
import Main from './Main.jsx';

const defaults = {
  BASE_URL: 'http:localhost:3001'
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: null,
      starship: null,
      planet: null,
      distance: 0,
      credits: 0,
      gameStart: false,
      hideNewPlayer: true,
      generators: [],
      turns: 0,
      finished: false
    };
    this.startNewGame = this.startNewGame.bind(this);
    this.setPlayerData = this.setPlayerData.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleLevelup = this.handleLevelup.bind(this);
    this.handleShipPurchase = this.handleShipPurchase.bind(this);
    this.handleModulePurchase = this.handleModulePurchase.bind(this);
    this.runTick = this.runTick.bind(this);
  }

  startNewGame() {
    this.setState({
      gameStart: true,
      hideNewPlayer: false
    });
  }

  setPlayerData(data) {
    axios.post(defaults.BASE_URL + '/new', {
      username: data.username,
      species: data.species
    })
    .then((response) => {
      return axios.get(defaults.BASE_URL + '/new');
    })
    .then((response) => {
      this.setState({
        player: data,
        generators: response.data.generators,
        credits: response.data.credits,
        hideNewPlayer: true,
        turns: response.data.turns,
        starship: response.data.starship,
        planet: response.data.planet,
        distance: response.data.distance
      });
    })
    .catch((err) => console.log(err));
  }

  handlePurchase(property) {
    axios.post(defaults.BASE_URL + '/purchase', {
      property: property
    })
    .then((response) => {
      if (!response.data.successful) { alert(`you can't afford ${property}`); }
      let currGen = this.state.generators.slice();
      currGen.find((a) => a.name === property).count = response.data.count;
      this.setState({
        credits: response.data.credits || 0,
        generators: currGen
      });
    })
    .catch((err) => console.log(err));
  }

  handleLevelup(property) {
    if (property === 'KingpinSeamus') { return alert('... why'); }
    axios.post(defaults.BASE_URL + '/levelup', {
      property: property
    })
    .then((response) => {
      if (!response.data.successful) { alert(`you can't afford to upgrade ${property}`); }
      // Fetch up the level of the generators too
      let currGen = this.state.generators.slice();
      currGen.find((a) => a.name === property).level = response.data.level;
      currGen.find((a) => a.name === property).output = response.data.output;
      this.setState({
        credits: response.data.credits || 0,
        generators: currGen
      });
    })
    .catch((err) => console.log(err));
  }

  handleShipPurchase(shipName) {
    axios.post(defaults.BASE_URL + '/starship', {
      name: shipName
    })
    .then((response) => {
      if (!response.data.successful) { alert(`you can't afford to buy ${shipName}`); }
      this.setState({
        credits: response.data.credits,
        starship: response.data.starship
      });
    })
    .catch((err) => console.log(err));
  }

  handleModulePurchase() {
    
  }

  runTick() {
    axios.post(defaults.BASE_URL + '/runtick')
      .then((response) => {
        this.setState({
          credits: response.data.credits,
          turns: response.data.turns,
          distance: response.data.distance,
          finished: response.data.finished
        });
      });
  }

  render() {
    let newGameButton = this.state.gameStart ? null : <button onClick={this.startNewGame}>New Game</button>;
    let newPlayer = this.state.hideNewPlayer ? null : 
      <NewPlayer 
        species={this.props.species} 
        handleSubmit={this.setPlayerData} />;
    let control = this.state.player ?
      <Control 
        player={this.state.player}
        credits={this.state.credits}
        starship={this.state.starship}
        handlePurchase={this.handlePurchase}
        handleLevelup={this.handleLevelup} 
        handleShipPurchase={this.handleShipPurchase}
        handleModulePurchase={this.handleModulePurchase}
        generators={this.state.generators}
        starships={this.props.starships} /> : null;
    let main = this.state.player ?
      <Main 
        planet={this.state.planet.name}
        distance={this.state.distance} /> : null;

    if (this.state.finished) {
      return (
        <div>
          <h1>You won! If only there were a way to save your score... blame lazy developer</h1>
        </div>
      )
    }
    return (
      <div style={{'marginLeft': 12}}>
        {newGameButton}        
        {newPlayer}
        {main}
        {control}  
        <div style={{'float': 'left', 'margin': '4px 4px 4px 8px'}}>
          {this.state.gameStart && this.state.hideNewPlayer ? 
            <button onClick={this.runTick}>End turn</button> : null}
          {this.state.gameStart && this.state.hideNewPlayer ? 
            <p>Turns: {this.state.turns}</p> : null}
        </div>
        
      </div>
    )
  }
}

export default Game;