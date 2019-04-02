import React, { Component } from 'react';
import reveal from '../../scrollReveal/Reveal'
import './img.css'

class Image extends Component {
  isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  src = this.isSafari ? this.props.altSrc : this.props.src
  render() {
    return this.props.reveal ? reveal(<div className="imgContainer"><img src={this.src} className="imgStyling" alt={""} /></div>) 
    : <div className="imgContainer"><img src={this.src} className="imgStyling" alt={this.src}/></div>
  }
}
export default Image;



