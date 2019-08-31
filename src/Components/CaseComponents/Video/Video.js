import React, { Component } from "react"
import PropTypes from "prop-types"
import VidComp from "./VidComponent"
import reveal from "../../HOC/scrollReveal/Reveal"
import styles from  "./vid.module.css"

class Video extends Component {
	render() {
		return (
			<div className={styles.vidContainer}> 
				<VidComp src={this.props.src}/>
				<div className={styles.textStyling}>
					<h2 className="marker reduceSpace tabOver">{this.props.title}</h2>
					<p className="text reduceSpace">{this.props.children}</p>
                
				</div>
			</div>
         
		)
	}
}
Video.propTypes = {
	src: PropTypes.node.isRequired,
	altSrc: PropTypes.node.isRequired,
	children: PropTypes.any,
	title: PropTypes.any
}


export default reveal(Video)