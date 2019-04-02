import React, { Component } from 'react';
import Typist from 'react-typist';
import Blurb from './RevAbout'
import portrait from '../../Assets/portrait.webp'
import altPortrait from '../../Assets/portrait.png'
import '../../Assets/standardized.css'
import './about.css'

class Intro extends Component {
  isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  src = this.isSafari ? altPortrait : portrait
  render() {
    
    return (
      <div className="introAndImg">
        <div className="introCont">
          <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="serif">
            <span>nice to meet you, my name is <span className="marker">cameron</span></span>
          </Typist>
          <Blurb />
        </div>

        <img src={this.src} alt={""} className="aboutImg" />
      </div>
    );
  }
}

export default Intro;
