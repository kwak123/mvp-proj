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
    this.verifyData = this.verifyData.bind(this);
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

  verifyData(e) {
    if (this.state.username && this.state.species) {
      this.props.handleSubmit(this.state);
    } else {
      alert('Please submit valid user data');
    }
  }

  render() {
    return (
      <div>
        <h3>Player Data</h3>
        <input type="text" onChange={this.onNameChange} value={this.state.username}></input>
        <select value={this.state.species} onChange={this.onSpeciesChange}>
          <option value=''>Select a species</option>
          {this.props.species.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
        </select>
        <button onClick={() => this.verifyData()}>Submit</button>
      </div>
    );
  }

}

export default NewPlayer;