import React, { Component } from 'react';
import './Intro.css';
import Typing from './Typing'


class App extends Component {
  render() {
    return (
        <div className="fixed">
          <div className="typePos"><Typing /></div>
        </div>
    );
  }
}

export default App;
