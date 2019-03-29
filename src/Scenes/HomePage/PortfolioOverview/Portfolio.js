import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../Components/card/Card'
import RiT from '../../../Assets/RIt.png'
import DII from '../../../Assets/DII/DIILogo.PNG'
import dist from '../../../Assets/distDelivery.png'
import './portfolio.css';


class Portfolio extends Component {
  render() {
    return (
      <div className="pContainer">
        <Link to="/recycleit">
          <Card subtitle={"React Native"}  backgroundImage={RiT}>RecycleIt</Card>
        </Link>
        <div className="offset">
          <Link to="/DII">
            <Card subtitle={"React Native"} backgroundImage={DII}>Digital Insights and Integrations</Card>
          </Link>
        </div>
        <Link to="/distDeliveries">
          <Card subtitle={"React.js"} backgroundImage={dist}>Distributed Deliveries</Card>
        </Link>
      </div>
    );
  }
}

export default Portfolio;
