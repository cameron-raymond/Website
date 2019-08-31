import React, { Component } from "react"
import Typist from "react-typist"
import analytics from "../../Components/HOC/analytics/Analytics"
import Info from "./CInfo"
import styles from "./contact.module.css"

class Contact extends Component {
	render() {
		return (
			<div className={styles.container}>
				<h1>
					<Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="reduceSpace">
						<span>let&apos;s <span className="marker"> get in touch</span></span>
					</Typist>
				</h1>
				<Info />
			</div>
		)
	}
}

export default analytics(Contact, "/contact")
