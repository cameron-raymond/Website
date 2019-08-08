import React, { Component } from "react"
import ReactGA from "react-ga"

export default function reveal(WrappedComponent, pageName) {
	return class Analytics extends Component {
		initializeReactGA() {
			ReactGA.initialize("UA-133541363-1")
			ReactGA.pageview(pageName)
		}
		UNSAFE_componentWillMount() {
			if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
				console.log("dev")
			} else {
				this.initializeReactGA()
			}
		}


		render() {
  
			return (
				<WrappedComponent
					{...this.props}
				/>
			)
		}
	}
}