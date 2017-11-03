import React from 'react';
import axios from 'axios';
import NewPlayer from './NewPlayer.jsx';
import Control from './Control.jsx';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: null,
      credits: 0,
      gameStart: false,
      hideNewPlayer: true,
      generators: []
    };
    this.startNewGame = this.startNewGame.bind(this);
    this.setPlayerData = this.setPlayerData.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.runTick = this.runTick.bind(this);
  }

  startNewGame() {
    this.setState({
      gameStart: true,
      hideNewPlayer: false
    });
  }

  setPlayerData(data) {
    axios.post('http:localhost:3001/new', {
      username: data.username,
      species: data.species
    })
    .then((response) => {
      return axios.get('http:localhost:3001/new');
    })
    .then((response) => {
      this.setState({
        player: data,
        generators: response.data.generators,
        credits: response.data.credits,
        hideNewPlayer: true
      });
    })
    .catch((err) => console.log(err));
  }

  handlePurchase(property) {
    axios.post('http:localhost:3001/purchase', {
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

  runTick() {
    axios.post('http:localhost:3001/runtick')
      .then((response) => {
        this.setState({
          credits: response.data.credits
        });
      });
  }

  render() {
    let newGameButton = this.state.gameStart ? null : <button onClick={this.startNewGame}>New Game</button>;
    let newPlayer = this.state.hideNewPlayer ? null : <NewPlayer species={this.props.species} handleSubmit={this.setPlayerData}/>;

    return (
      <div>
        {newGameButton}        
        {newPlayer}
        {this.state.player && 
          <Control 
            player={this.state.player} 
            credits={this.state.credits} 
            handlePurchase={this.handlePurchase} 
            generators={this.state.generators} />}   
        {this.state.gameStart && this.state.hideNewPlayer ? <button onClick={this.runTick}>End turn</button> : null}
      </div>
    )
  }
}

export default Game;