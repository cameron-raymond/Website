import React, { Component } from "react"
import Typing from "./Typing"
import styles from "./Intro.module.css"


class Intro extends Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.typePos}><Typing /></div>
			</div>
		)
	}
}

export default Intro
