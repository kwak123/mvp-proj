import React from 'react';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let divStyle = {
      'height': 120
    }
    return (
      <div style={divStyle}>
        <h1>Remaining distance</h1>
        <p>{this.props.planet}</p>
        <p>{this.props.distance}</p>
      </div>
    )
  }
}

export default Main;