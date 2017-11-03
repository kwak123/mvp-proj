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
      names: []
    };
    this.startNewGame = this.startNewGame.bind(this);
    this.setPlayerData = this.setPlayerData.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  startNewGame() {
    this.setState({
      gameStart: true
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
        names: response.data.names,
        credits: response.data.credits
      });
    })
    .catch((err) => console.log(err));
  }

  handlePurchase(property) {

  }

  render() {
    let newGameButton = this.state.gameStart ? null : <button onClick={this.startNewGame}>New Game</button>
    let newPlayer = this.state.gameStart ? <NewPlayer species={this.props.species} handleSubmit={this.setPlayerData}/> : null;
    return (
      <div>
        {newPlayer}
        {this.state.player && 
          <Control 
            player={this.state.player} 
            credits={this.state.credits} 
            handlePurchase={this.handlePurchase} 
            names={this.state.names} />}   
        {newGameButton}
      </div>
    )
  }
}

export default Game;