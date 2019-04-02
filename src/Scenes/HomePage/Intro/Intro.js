import React, { Component } from 'react';
import './Intro.css';
import Typing from './Typing'


class Intro extends Component {
  render() {
    return (
          <div className="container">
          <div className="typePos"><Typing /></div>
          </div>
    );
  }
}

export default Intro;
