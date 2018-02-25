import React, { Component } from 'react';
import Header from './components/Header';
import Astronauts from './components/Astronauts';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Astronauts />
      </div>
    );
  }
}

export default App;
