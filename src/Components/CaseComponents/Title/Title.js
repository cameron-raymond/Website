import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import Typist from "react-typist"
import styles from "./title.module.css"

class Title extends PureComponent {
	render() {
		return (
			<div className={styles.caseTitle}>
				<Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="serif primary">
					<p className="serif primary marker reduceSpace">{this.props.title}</p>
					<br/>
					<span className="text reduceSpace">{this.props.children}</span>
				</Typist>
			</div>
		)
	}
}

Title.propTypes = {
	title: PropTypes.string,
	children: PropTypes.string,
}

export default Title
