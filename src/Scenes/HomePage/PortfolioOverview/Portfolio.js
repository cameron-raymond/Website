import React, { Component } from 'react';
import Card from '../../../Components/card/Card'
import { Link } from 'react-router-dom';
import './portfolio.css';


class Portfolio extends Component {
  render() {
    return (
      <div className="pContainer">
        <Link to="/recycleit">
          <Card subtitle={"react native"}>RecycleIt</Card>
        </Link>
        <div className="offset">
          <Link to="/DII">
            <Card subtitle={"react native"}>Digital Insights and Integrations</Card>
          </Link>
        </div>
        <Link to="/distDeliveries">
          <Card subtitle={"react js"}>Distributed Deliveries</Card>
        </Link>
      </div>
    );
  }
}

export default Portfolio;
