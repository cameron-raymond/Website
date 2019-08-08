import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./img.module.css"

class Image extends Component {
	render() {
		const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
		const src = isSafari ? this.props.altSrc : this.props.src
		return <div className={styles.imgContainer} ><img src={src} className={styles.imgStyling} alt={src} /></div>
	}
}
Image.propTypes = {
	src: PropTypes.node.isRequired,
	altSrc: PropTypes.node.isRequired
}

export default Image



