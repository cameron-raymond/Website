import React, { Component } from 'react';
import './img.css'

class Image extends Component {


  render() {
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const src = isSafari ? this.props.altSrc : this.props.src
    return <div className="imgContainer" ><img src={this.src} className="imgStyling" alt={ssrc} /></div>
  }
}
export default Image;



