import React, {Component} from "react"
import ReactDOM from "react-dom"
 
import scrollReveal from "./scrollReveal"
 
export default function reveal(WrappedComponent,reset=true) {
	return class RevealEnhancer extends Component {
		bindRef(c) {
			this.component = c
		}
 
		componentDidMount() {
			// eslint-disable-next-line react/no-find-dom-node
			const domElement = ReactDOM.findDOMNode(this.component)
			scrollReveal.reveal(domElement,{ viewFactor: 0.21, reset: reset})
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