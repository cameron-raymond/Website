import React from "react"
import { Helmet } from "react-helmet"
import analytics from "../../Components/HOC/analytics/Analytics"
import Intro from "./Intro/Intro"
import Portfolio from "./PortfolioOverview/Portfolio"
import Footer from "../../Components/Footer/Footer"

class Home extends React.Component {

	render() {
		return (
			<div className="caseContainer">
				<Helmet>
					<title>Cameron Raymond</title>
					<meta name="Description" content="Nice to meet you, my name is Cameron Raymond. I am a software developer, and student at Queen's University."/>
				</Helmet>

				<Intro />
				<Portfolio/>
				<Footer to={"contact"}linkTitle={"contact"} linkTitleMobile={"contact"}/>
			</div>
		)
	}
}

export default analytics(Home,"/home")
