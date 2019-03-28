import React, { Component } from 'react';
import reveal from '../scrollReveal/Reveal'
import './card.css'


class Card extends Component {
  render() {
    return (
      <div className="card">
          <p>test</p>
         

      </div>
    );
  }
}

export default reveal(Card);



