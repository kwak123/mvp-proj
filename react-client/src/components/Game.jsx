import React from 'react';
import axios from 'axios';
import NewPlayer from './NewPlayer.jsx';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: {},
      credits: -1,
      gameStart: false
    };
    this.startNewGame = this.startNewGame.bind(this);
    this.setPlayerData = this.setPlayerData.bind(this);
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
      return axios.get('http:localhost:3001/player');
    })
    .then((data) => {

    })
    .catch((err) => console.log(err));
    this.setState({
      player: data
    });
  }

  render() {
    let newGameButton = this.state.gameStart ? null : <button onClick={this.startNewGame}>New Game</button>
    let playerInfo = this.player ? null : (
      <div>
        <p>{this.state.player.username}</p>
        <p>{this.state.player.species}</p>
        <p>{this.state.credits}</p>
      </div>
    )
    return (
      <div>
        {this.state.gameStart && <NewPlayer species={this.props.species} handleSubmit={this.setPlayerData}/>}
        {newGameButton}
      </div>
    )
  }
}

export default Game;