import React from 'react';
import axios from 'axios';
import NewPlayer from './NewPlayer.jsx';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: {},
      credits: 0,
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
      console.log(data);
    })
    .catch((err) => console.log(err));
    this.setState({
      player: data
    });
    console.log(data);
  }

  render() {
    let newGameButton = this.state.gameStart ? null : <button onClick={this.startNewGame}>New Game</button>
    let playerInfo = Object.keys(this.state.player).length ? (
      <div>
        <p>{this.state.player.username}</p><p>{this.state.player.species}</p><p>{this.state.credits}</p>
      </div>
    ) : null;
    return (
      <div>
        {this.state.gameStart && <NewPlayer species={this.props.species} handleSubmit={this.setPlayerData}/>}
        {playerInfo}        
        {newGameButton}
      </div>
    )
  }
}

export default Game;