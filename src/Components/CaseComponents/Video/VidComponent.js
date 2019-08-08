import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from  "./vid.module.css"


class VidComp extends Component {

	render() {
		return (
			<video className={styles.vidStyling} autoPlay loop muted playsinline>
				<source src={this.props.src} type='video/mp4' />
			</video>
		)
	}
}
VidComp.propTypes = {
	src: PropTypes.node.isRequired,
}


export default VidComp