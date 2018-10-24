import React, { Component } from 'react';
import './Intro.css';
import Typing from './Typing'


class App extends Component {
  render() {
    return (
      <div>
        <Typing/>
        <div className="background">
        </div>
      </div>
    );
  }
}

export default App;
