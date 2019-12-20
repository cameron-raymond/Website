import React from "react"
import ReactDOM from "react-dom"
// import { render } from 'react-snapshot';
import { HashRouter as Router, Route } from "react-router-dom"
import ScrollToTop from "./Assets/ScrollToTop"
// eslint-disable-next-line no-unused-vars
import Header from "./Components/header/Header"
import Home from "./Scenes/HomePage/Home"
import RecycleIt from "./Scenes/RecycleIt/RecyleIt"
import DII from "./Scenes/DigitalInsights/DigInsights"
import PS from "./Scenes/PublicisSapient/PublicisSapient"
import DistDelivery from "./Scenes/DistDelivery/DistDelivery"
import About from "./Scenes/About/About"
import Contact from "./Scenes/Contact/Contact"
import TrafficSimulation from "./Scenes/TrafficSimulation/TrafficSimulation"
import "./index.css"

class MyApp extends React.PureComponent {
	render() {
		return (
			<Router>
				<div>
					<Header/>
					<ScrollToTop>
						<Route exact path="/" component={Home} />
						<Route path="/recycleit" component={RecycleIt} />
						<Route path="/DII" component={DII} /> 
						<Route path="/distDelivery" component={DistDelivery} />
						<Route path="/about" component={About} />
						<Route path="/contact" component={Contact} />
						<Route path="/publicissapient" component={PS}/>
						<Route path="/trafficSim" component={TrafficSimulation}/>
					</ScrollToTop>
				</div>
			</Router>
		)
	}
}


ReactDOM.render(<MyApp/>, document.getElementById("root"))
