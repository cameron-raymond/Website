import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const test = <h1>Mamma Mia</h1>
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cameron Raymond</h1>
        </header>
        <p className="App-intro">
          Hello world
        </p>
        {test}
      </div>
    );
  }
}

export default App;
