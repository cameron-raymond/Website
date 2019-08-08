import React, { Component } from "react";
import reveal from "../HOC/scrollReveal/Reveal"
import styles from "./card.module.css"


class Card extends Component {
  isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  src = this.isSafari ? this.props.altSrc : this.props.src
  render() {
  	return (
  		<div className={styles.card} style={{ backgroundImage: `url(${this.src})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
  			<div className={styles.overlay}/>
  			<div className={styles.cardContent}>
  				<p className="title light">{this.props.children}</p>
  				<p className="text light">{this.props.subtitle}</p>
  			</div>
  		</div>
  	)
  }
}

// export default reveal(Card);
export default reveal(Card)



