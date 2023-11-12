import React, { Component } from 'react';
import dotenv from 'dotenv';
dotenv.config()

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sensors: []
    }
  }

  componentDidMount() {
    fetch(`http://${process.env.HOST}:3000/sensors`)
      .then(response => response.json())
      .then(res => {
        if (res && res.data) {
          this.setState({ sensors: [...this.state.sensors, ...res.data] })
        }
      })
  }

  renderSensors() {
    if (this.state.sensors.length <= 0) {
      return <div>Loading...</div>
    }
    else {
      return this.state.sensors.map((val, key) => {
        return <div key={key}>{val.sensor} | {val.data}</div>
      });
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderSensors()}
      </div>
    );
  }
}

export default App;
