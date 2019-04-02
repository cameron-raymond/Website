import React, { Component } from 'react';
import reveal from '../scrollReveal/Reveal'
import '../../Assets/standardized.css'
import './card.css'


class Card extends Component {
  isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  src = this.isSafari ? this.props.altSrc : this.props.src
  render() {
    return (
      <div className="card" style={{ backgroundImage: `url(${this.src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="overlay"/>
        <div className="cardContent">
          <p className="title light">{this.props.children}</p>
          <p className="subtitle light">{this.props.subtitle}</p>
        </div>
      </div>
    );
  }
}

// export default reveal(Card);
export default reveal(Card);



