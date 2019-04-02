import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../Components/card/Card'
import RiT from '../../../Assets/RIT/RIt.webp'
import altRiT from '../../../Assets/RIT/RIt.png'
import DII from '../../../Assets/DII/DIILogo.webp'
import dist from '../../../Assets/distDelivery/distDelivery.webp'
import altDist from '../../../Assets/distDelivery/distDelivery.png'
import './portfolio.css';


class Portfolio extends Component {
  render() {
    return (
      <div className="pContainer">
        <Link to="/recycleit">
          <Card subtitle={"React Native"} altSrc={altRiT} src={RiT}>RecycleIt.</Card>
        </Link>
        <div className="offset">
        <Link to="/distDelivery">
          <Card subtitle={"React.js"} altSrc={altDist} src={dist}>Distributed Delivery</Card>
        </Link>
          {/* <Link to="/DII">
            <Card subtitle={"React Native"} backgroundImage={DII}>Digital Insights</Card>
          </Link> */}
        </div>
        {/* <Link to="/distDelivery">
          <Card subtitle={"React.js"} backgroundImage={dist}>Distributed Delivery</Card>
        </Link>
         */}
        
      </div>
    );
  }
}

export default Portfolio;
