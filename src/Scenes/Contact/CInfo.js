import React, { Component } from "react"
import reveal from "../../Components/HOC/scrollReveal/Reveal"
import styles from "./contact.module.css"

class CInfo extends Component {
	render() {
		return (
			<div className="tabOver">
				<p className="text reduceSpace">Thanks for checking out my portfolio! All source code can be found on my         <a href="https://github.com/cameron-raymond" className={styles.link}>github</a>.</p>
				<p className="text reduceSpace">Want to learn more? Let's grab coffee and chat; feel free to reach out at
					<a href="mailto:c.raymond@queensu.ca" className={styles.link}> c.raymond@queensu.ca</a>,
           or <a href="https://linkedin.com/in/cameron-raymond/" className={styles.link}>linkedIn</a>.
				</p>
			</div>
		)
	}
}

export default reveal(CInfo)

