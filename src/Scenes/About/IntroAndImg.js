import React, { Component } from 'react';
import Typist from 'react-typist';
import Blurb from './RevAbout'
import portrait from '../../Assets/portrait.webp'
import altPortrait from '../../Assets/portrait.png'
import styles from './about.module.css'

class Intro extends Component {
  isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  src = this.isSafari ? altPortrait : portrait
  render() {
    
    return (
      <div className={styles.introAndImg}>
        <div className={styles.introCont}>
          <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="serif">
            <span>nice to meet you, my name is <span className="marker">cameron</span></span>
          </Typist>
          <Blurb />
        </div>

        <img src={this.src} alt={""} className={styles.aboutImg} />
      </div>
    );
  }
}

export default Intro;
