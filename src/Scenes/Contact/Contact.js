import React, { Component } from "react"
import { Helmet } from "react-helmet"
import Typist from "react-typist"
import analytics from "../../Components/HOC/analytics/Analytics"
import Info from "./CInfo"
import styles from "./contact.module.css"

class Contact extends Component {
	render() {
		return (
			<div className={styles.container}>
				<Helmet>
					<title>Contact - Cameron Raymond</title>
					<meta name="description" content="Cameron Raymond is a software developer and student at Queen's University." />
				</Helmet>
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
