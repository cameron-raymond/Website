import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../Components/card/Card'
import RiT from '../../../Assets/RIT/RIt.webp'
import altRiT from '../../../Assets/RIT/RIt.png'
import DII from '../../../Assets/DII/DIILogo.webp'
import altDII from '../../../Assets/DII/DIILogo.PNG'
import dist from '../../../Assets/distDelivery/distDelivery.webp'
import altDist from '../../../Assets/distDelivery/distDelivery.png'
import trendr from '../../../Assets/Trendr/trendr.webp'
import altTrendr from '../../../Assets/Trendr/trendr.png'
import styles from './portfolio.module.css';


class Portfolio extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link className={styles.noUnderline} to="/DII">
          <Card subtitle={"React Native"} altSrc={altDII} src={DII}>Digital Insights</Card>
        </Link>
        <div className={styles.offset}>
          <Link className={styles.noUnderline} to="/publicissapient">
            <Card subtitle={"Product Management"} altSrc={altTrendr} src={trendr}>Trendr</Card>
          </Link>
        </div>

        <Link className={styles.noUnderline} to="/recycleit">
          <Card subtitle={"React Native"} altSrc={altRiT} src={RiT}>RecycleIt.</Card>
        </Link>

        <div className={styles.offset}>
          <Link className={styles.noUnderline} to="/distDelivery">
            <Card subtitle={"React.js"} altSrc={altDist} src={dist}>Distributed Delivery</Card>
          </Link>
        </div>


      </div>
    );
  }
}

export default Portfolio;
