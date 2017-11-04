import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Game from './components/Game.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      starships: [],
      people: [],
      species: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/')
      .then(({ data }) => {
        this.setState({
          planets: data.planets,
          starships: data.starships,
          people: data.people,
          species: data.species
        });
      })
      .catch((err) => console.error(err));
  }

  render () {
    return (
    <div>
      <h1 style={{'margin': 10}}>Ster Wers (Don't sue me Disney)</h1>
      <h2 style={{'margin': '-10px 0px 40px 10px'}}>Truly Imbalanced Gameplay</h2>
      <Game
        planets={this.state.planets}
        starships={this.state.starships}
        people={this.state.people}
        species={this.state.species} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));