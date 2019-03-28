import React, { Component } from 'react';
import reveal from '../scrollReveal/Reveal'
import './card.css'


class Card extends Component {
  render() {
    return (
      <div className="card">
          {/* <div className="cardContent"><p>{this.props.children}</p></div>          */}
          <p>{this.props.title}</p>
      </div>
    );
  }
}

export default reveal(Card);



