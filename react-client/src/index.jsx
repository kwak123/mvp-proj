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
      <h1>Star Swars (Don't sue me Disney)</h1>
      <Game species={this.state.species} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));