import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Emoji from "../Emoji"
import styles from "./footer.module.css"

class Footer extends PureComponent {
	render() {
		// when you run npm deploy, it calls the deploy.sh shell script. Amongst other things it (like committing changes and stuff),
		// it uses sed to find the lastUpdated variable and change its value to todays date. That way I don't have
		// to change anything manually and whenever I deploy a new version it automatically updates.
		// eslint-disable-next-line quotes
		const lastUpdated = '07-28-19'
		return (
			<div className={styles.footer}>
				<div className={styles.footInfo}>
					<p className="subheading"><Emoji symbol="👨‍🎨" /> and <Emoji symbol="👷‍♂️" /> by me as of {lastUpdated}</p>
					<a href="mailto:c.raymond@queensu.ca" className="subheading">c.raymond@queensu.ca</a>
					<a href="https://linkedin.com/in/cameron-raymond/" className="subheading">linkedIn</a>
					<a href="https://github.com/cameron-raymond" className="subheading">github</a>
				</div>

				<Link to={this.props.to}>
					<p className={styles.viewNext + " serif onHov"}>{this.props.linkTitle}</p>
					<p className={styles.viewNextMobile + " serif onHov"}>{this.props.linkTitleMobile}</p>
				</Link>
			</div>
		)
	}
}
Footer.propTypes = {
	to: PropTypes.string,
	linkTitle: PropTypes.string,
	linkTitleMobile: PropTypes.string
}
Footer.defaultProps ={
	to: "/",
	linkTitle: "i wanna go home",
	next: "home"
}
export default Footer



