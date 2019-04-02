import React, { Component } from 'react';
import reveal from '../../scrollReveal/Reveal'
import './img.css'

class Image extends Component {
  render() {
    return this.props.reveal ? reveal(<div className="imgContainer"><img src={this.props.src} className="imgStyling" alt={""} /></div>) 
    : <div className="imgContainer"><img src={this.props.src} className="imgStyling" alt={this.props.src} /></div>
  }
}
export default Image;



