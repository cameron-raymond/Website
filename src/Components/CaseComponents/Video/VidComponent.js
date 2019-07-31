import React, { Component } from "react"
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

export default VidComp