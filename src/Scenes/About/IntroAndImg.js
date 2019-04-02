import React, { Component } from 'react';
import Typist from 'react-typist';
import Blurb from './RevAbout'
import portrait from '../../Assets/portrait.webp'
import '../../Assets/standardized.css'
import './about.css'

class Intro extends Component {
  render() {
    return (
      <div className="introAndImg">
        <div className="introCont">
          <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="serif">
            <span>nice to meet you, my name is <span className="marker">cameron</span></span>
          </Typist>
          <Blurb />
        </div>
      
          <img src={portrait} alt={""} className="aboutImg" />
      </div>
        );
      }
    }
    
    export default Intro;
