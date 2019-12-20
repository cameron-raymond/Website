import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import styles from "./overview.module.css"

class SmallList extends PureComponent {
    handleList = (arr) => {
    	return arr.map((val, index) => {
    		if (index < arr.length - 1) {
    			return <p key={index} className={"text "+styles.removeListSpace}>{val}<span className={styles.hideComma}>,&nbsp;</span></p>
    		}
    		return <p key={"end"} className={"text "+styles.removeListSpace}>{val}</p>
    	}
    	)
    }

    render() {
    	return (
    		<div className={styles.smallListCont}>
    			<h3 className={styles.reduceListSpace} >{this.props.children}</h3>
    			<div className={styles.indent}>
    				{this.props.elements ? this.handleList(this.props.elements) : null}
    			</div>
    		</div>
    	)
    }
}
SmallList.propTypes = {
	children: PropTypes.string,
	elements: PropTypes.array,
}

export default SmallList
