import React from 'react';

// Make species a dropdown at some point

class NewPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      species: ''
    }
    this.onNameChange = this.onNameChange.bind(this);
    this.onSpeciesChange = this.onSpeciesChange.bind(this);
  }

  onNameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSpeciesChange(e) {
    this.setState({
      species: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h3>Player Data</h3>
        <input type="text" onChange={this.onNameChange} value={this.state.username}></input>
        <select value={this.state.species || 'Select a species'} onChange={this.onSpeciesChange}>
          {this.props.species.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
        </select>
        <button onClick={this.props.handleSubmit}>Submit</button>
      </div>
    );
  }

}

export default NewPlayer;