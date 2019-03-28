import React, { Component } from 'react';
import Card from '../../Components/card/Card'
import './portfolio.css';


class Portfolio extends Component {
  render() {
    return (
      <div className="pContainer">
        <Card/>
         <Card/>
        <Card/>
        {/*<Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        
        <Card/> */}
      </div>
    );
  }
}

export default Portfolio;
