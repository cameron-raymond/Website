import React, { Component } from 'react';
import './Block.css';



class Block extends Component {
    heading = "heading"+this.props.align
    innerBlock = this.props.mutate ? "innerBlock"+this.props.mutate : "innerBlock"
    outerBlock = this.props.mutate ? "outerBlock"+this.props.mutate : "outerBlock"

  render() {
    return (
          <div className={this.innerBlock} style={{backgroundColor: this.props.fgColour}}>
            <h1 className={this.heading}>{this.props.title}</h1>
            <div className={this.outerBlock} style={{backgroundColor: this.props.bgColour}}/> 
          </div>
    );
  }
}

export default Block;
