import React, { Component } from 'react';
import reveal from '../../scrollReveal/Reveal'
import './img.css'


class Image extends Component {
  render() {
    return (
      <div className="imgContainer">
          <img src={this.props.src} className="imgStyling"/>
      </div>
    );
  }
}

// export default reveal(Card);
export default reveal(Image);



