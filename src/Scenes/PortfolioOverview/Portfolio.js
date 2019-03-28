import React, { Component } from 'react';
import Card from '../../Components/card/Card'
import './portfolio.css';


class Portfolio extends Component {
  render() {
    return (
      <div className="pContainer">
        <Card>Recycle.It</Card>
        <div style={{ marginTop: 30 }}><Card title={"test"}>Recycle.It</Card></div>
        <Card />
        <div style={{ marginTop: 30 }}><Card /></div>
        {/*
        SOMETHING TO KEEP IN MIND FOR OFFSETTING SECOND COLUMN
         <div style={{marginTop: 20}}><Card/></div>
         <Card/>
         <div style={{marginTop: 30}}><Card/></div> */}
      </div>
    );
  }
}

export default Portfolio;
