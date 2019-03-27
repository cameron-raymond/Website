import React, { Component } from 'react';
import './Intro.css';
import Info from  '../../Components/info/info'
import reveal from '../../Components/scrollReveal/Reveal'
import Typing from './Typing'


class Intro extends Component {
  render() {
    return (
          <div>
            <Info/>
          <div className="typePos"><Typing /></div>
          </div>
    );
  }
}

export default reveal(Intro);
