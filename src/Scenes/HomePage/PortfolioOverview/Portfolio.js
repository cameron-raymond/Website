import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../Components/card/Card'
import RiT from '../../../Assets/RIT/RIt.webp'

import altRiT from '../../../Assets/RIT/RIt.png'
import DII from '../../../Assets/DII/DIILogo.webp'
import altDII from '../../../Assets/DII/DIILogo.PNG'
import dist from '../../../Assets/distDelivery/distDelivery.webp'
import altDist from '../../../Assets/distDelivery/distDelivery.png'
import styles from './portfolio.module.css';


class Portfolio extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/DII">
          <Card subtitle={"React Native"} altSrc={altDII} src={DII}>Digital Insights</Card>
        </Link>
        <div className={styles.offset}>

          <Link to="/recycleit">
            <Card subtitle={"React Native"} altSrc={altRiT} src={RiT}>RecycleIt.</Card>
          </Link>
        </div>

        <Link to="/distDelivery">
          <Card subtitle={"React.js"} altSrc={altDist} src={dist}>Distributed Delivery</Card>
        </Link>


      </div>
    );
  }
}

export default Portfolio;
