import React, { Component } from 'react';
import './Intro.css';
import Typing from './Typing'


class App extends Component {
  render() {
    return (
      <div>
        <div className="background">
        <div className="typePos"><Typing/></div>

        </div>
      </div>
    );
  }
}

export default App;
