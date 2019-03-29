import React, { Component } from 'react';
import reveal from '../scrollReveal/Reveal'
import '../../Assets/standardized.css'
import './card.css'


class Card extends Component {
  render() {
    console.log(this.props.children)
    return (
      <div class="card" style={{ backgroundImage: `url(${this.props.backgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
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



