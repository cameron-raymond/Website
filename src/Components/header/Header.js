import React from "react"
import { NavLink } from "react-router-dom"
import { FiUser, FiMessageSquare, FiClipboard } from "react-icons/fi"
import ReactGA from "react-ga"
import styles from "./header.module.css"
import resume from "../../Assets/CRaymondResume2020.pdf"

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isHide: false,
			style: styles.header
		}
	}

    hideBar = () => {
    	const { isHide } = this.state
    	window.scrollY > this.prev ?
    		!isHide && this.setState({ isHide: true })
    		:
    		isHide && this.setState({ isHide: false })

    	this.prev = window.scrollY
    }

    componentDidMount() {
    	window.addEventListener("scroll", this.hideBar)
    }

    componentWillUnmount() {
    	window.removeEventListener("scroll", this.hideBar)
    }
    render() {
    	var headerStyle = this.state.isHide ? styles.header + " " + styles.navUp : styles.header
    	return (
    		<div className={headerStyle}>
    			<NavLink to="/" style={styles.noUnderline}><h3 className="onHov">cameron<span className={styles.hideHead}> raymond</span></h3></NavLink>
    			<div style={{
    				display: "flex",
    				minWidth: 100,
    				maxWidth: 250,
    				flex: 0.25,
    				flexDirection: "row",
    				justifyContent: "space-between",
    				alignItems: "center"
    			}}>
    				<ReactGA.OutboundLink
    					eventLabel="clickedResume"
    					to={resume}
    				>
    					<h3 className="onHov"><span className={styles.hideIcons}><FiClipboard /></span><span className={styles.hideLinks}>resumé</span></h3>
    				</ReactGA.OutboundLink>
    				<NavLink exact className="text" to="/about"><p><span className={styles.hideIcons}><FiUser /></span><span className={styles.hideLinks}>about</span></p></NavLink>
    				<NavLink exact className="text" to="/contact"> <p ><span className={styles.hideIcons}><FiMessageSquare /></span><span className={styles.hideLinks}>contact</span></p></NavLink>
    			</div>

    		</div>
    	)
    }
}
export default Header
