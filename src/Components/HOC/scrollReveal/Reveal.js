import React, {Component} from "react"
import ReactDOM from "react-dom"
 
import scrollReveal from "./scrollReveal"
 
export default function reveal(WrappedComponent) {
	return class RevealEnhancer extends Component {
		bindRef(c) {
			this.component = c
		}
 
		componentDidMount() {
			const domElement = ReactDOM.findDOMNode(this.component)
			scrollReveal.reveal(domElement,{ viewFactor: 0.21})
		}
 
		render() {
			const that = this
			return (
				<WrappedComponent
					ref={
						function (c) {
							that.bindRef(c)
						}
					}
					{...this.props}
				/>
			)
		}
	}
}