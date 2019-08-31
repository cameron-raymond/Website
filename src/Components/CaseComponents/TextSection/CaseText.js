import React, { Component } from "react"
import PropTypes from "prop-types"
import reveal from "../../HOC/scrollReveal/Reveal"
import styles from "./casetext.module.css"

class CaseText extends Component {
	render() {
		return (
			<div className={styles.cTextCont}>
				<h3 className="marker reduceSpace">{this.props.title}</h3>
				<div className={styles.infoCont}>
					<p className="text reduceSpace">{this.props.children}</p>
				</div>
			</div>
		)
	}
}
CaseText.propTypes = {
	title: PropTypes.string,
	children: PropTypes.string,
}

export default reveal(CaseText)



