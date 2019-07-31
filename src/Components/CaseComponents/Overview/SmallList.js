import React, { PureComponent } from "react"
import styles from "./overview.module.css"

class SmallList extends PureComponent {
    handleList = (arr) => {
    	return arr.map((val, index) => {
    		if (index < arr.length - 1) {
    			return <p className={"text"}>&nbsp;&nbsp;{val}<span className={styles.hideComma}>,</span></p>
    		}
    		return <p key={"end"} className={"text"}>&nbsp;&nbsp;{val}</p>
    	}
    	)
    }

    render() {
    	return (
    		<div>
    			<p className={styles.reduceListSpace+" textEmphasis"} >{this.props.children}</p>
    			<div className={styles.removeLineBreak}>
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
