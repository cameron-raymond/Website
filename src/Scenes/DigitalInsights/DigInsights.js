import React, { Component } from "react"
import { Helmet } from "react-helmet"
import analytics from "../../Components/HOC/analytics/Analytics"
import Title from "../../Components/CaseComponents/Title/Title"
import Image from "../../Components/CaseComponents/Image/Image"
import Overview from "../../Components/CaseComponents/Overview/Overview"
import mockup from "../../Assets/DII/DIImockup.webp"
import altMockup from "../../Assets/DII/DIImockup.JPG"

import CaseText from "../../Components/CaseComponents/TextSection/CaseText"
import Footer from "../../Components/Footer/Footer"

class DII extends Component {
	render() {
		return (
			<div className="caseContainer">
				<Helmet>
					<title>Digital Insights and Integrations - Cameron Raymond</title>
					<meta name="description" content="A convenient and comprehensive retail banking analytics developed by Cameron Raymond with React Native." />
				</Helmet>
				<Title title={"Digital Insights and Integration"}>
          convenient and comprehensive retail banking analytics
				</Title>
				<Image src={mockup} altSrc={altMockup} />
				<Overview headers={["technologies", "buzzwords", "timeline"]} elements={[["react native", "firebase", "python"], ["data analytics", "data visualization"], ["june 18'-august 18"]]}>technologies</Overview>
				<CaseText title={"problem"}>	CIBC Digital&apos;s Insights and Analytics team is responsible for breaking down data, from various streams and platforms, into actionable insights regarding customers&apos; digital experience. This involves a large amount of consolidating data and is a time consuming process that needs to be repeated at regular intervals. More time spent organizing, consolidating and visualizing data means there’s less time the team is able to spend reporting on why these various trends matter. Therefore, the problem that needed to be addressed was: &quot;how can we automate the organization and visualization so that Insights and Analytics can spend more time working on analysis?&quot;</CaseText>
				<CaseText title={"methodology"}>
          There was a breadth of benchmarks that needed to be fulfilled to address this key problem. The resultant solution aimed to reduce tedious tasks that the Insights and Analytics team had to perform, while improving the reporting experience for executives at CIBC. Some key pain points identified were that: a large amount of time is spent consolidating data on regular intervals which could be automated, and that reports would be more impactful if they were more portable/interactive and easier to access.
					<br /><br />
          Therefore, any solution needed to be: relatively hands off through automation, easily modified by the analytics team, portable, interactive, and beautiful. </CaseText>
				<CaseText title={"solution"}>
          PDF reports emailed out on regular intervals to executives get buried by later emails, are static (hard to update/modify after the fact), and don’t allow for interactivity. Therefore, an internal mobile app that provided key information would give executives the most up-to-date information, and allow the Insights and Analytics team greater flexibility in how they report on KPIs.
					<br /><br />
          Due to the short length of my internship, React Native allowed me to build a pleasant experience across devices that could be distributed on IOS and Android. To allow for greater customization - all content on the app, including the navigation, is rendered dynamically and supplied by the backend. This way, KPI categories, tiles, and drilldown data can be added or dropped in the backend without anyone needing to update the app. I worked with another intern at CIBC to develop a Python script that populated the backend which the JS would then parse and render. <br />
					<br />
          Working with a designer, a consistent frontend was developed to provide a pleasant user experience. This meant that any number that an executive wanted to see was a 2 clicks away, and if more context to a KPI was needed an extra click would provide drilldown data that showed monthly/yearly trends and other important information.
					<br /><br />
          The resultant app is available across platforms and devices, customizable, automated, and most importantly – consolidates reporting into one consistent language, visually and semantically.
				</CaseText>
				<CaseText title={"impact"}>
          After 4 months of constant designing, development, and presenting on new iterations – I was fortunate enough to showcase the Insights and Integrations app to CIBC’s CEO Victor Dodig. It was later presented to CIBC’s CTO Deepak Khandelwal. By the end of my internship, the app was distributed to 14 high level executives at CIBC Digital.  
				</CaseText>
				<Footer to={"recycleIt"} linkTitle={"what else ya got"} linkTitleMobile={"next"} />
			</div>
		)
	}
}
    
export default analytics(DII, "/digitalInsights")
