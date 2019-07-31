import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import SmallList from "./SmallList"
import reveal from "../../HOC/scrollReveal/Reveal"
import styles from "./overview.module.css"

class Overview extends PureComponent {
	render() {
		let headers = this.props.headers
		let el = this.props.elements
		return (
			<div className={styles.oContainer}>
				{headers.map((val,index) => <SmallList key={index} elements={el[index]}>{val}</SmallList>)}
			</div>
		)
	}
}
Overview.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.string),
	elements: PropTypes.arrayOf(PropTypes.string),
}

export default reveal(Overview)
