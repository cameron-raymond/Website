import React, { Component } from 'react';
import './Block.css';



class Block extends Component {
    heading = "heading"+this.props.align
    innerBlock = this.props.mutate ? "innerBlock"+this.props.mutate : "innerBlock"

  render() {
    return (
          <div className={this.innerBlock} style={{backgroundColor: this.props.fgColour}} onMouseLeave={this.props.onMouseLeave} onMouseEnter={this.props.onMouseEnter} onClick={this.props.onClick}>
            <h1 className={this.heading}>{this.props.title}</h1>
            <div className={"outerBlock"} style={{backgroundColor: this.props.bgColour}}/> 
          </div>
    );
  }
}

export default Block;
