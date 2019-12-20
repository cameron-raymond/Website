import React, { Component } from "react"
import { Helmet } from "react-helmet"
import analytics from "../../Components/HOC/analytics/Analytics"
import Title from "../../Components/CaseComponents/Title/Title"
import Image from "../../Components/CaseComponents/Image/Image"
import Overview from "../../Components/CaseComponents/Overview/Overview"
import mockup from "../../Assets/SmartTraffic/TrafficSim.webp"
import altMockup from "../../Assets/SmartTraffic/TrafficSim.png"
import CaseText from "../../Components/CaseComponents/TextSection/CaseText"
import Footer from "../../Components/Footer/Footer"

class TrafficSimulation extends Component {
	render() {
		return (
			<div className="caseContainer">
				<Helmet>
					<title>RL Traffic Signal Control - Cameron Raymond</title>
					<meta name="description" content="Reinforcement learning for smarter cities." />
				</Helmet>
				<Title title={"Reinforcement Learning for Traffic Signal Control"}>
        machine learning for smarter cities
				</Title>
				<Image src={mockup} altSrc={altMockup} />
				<Overview headers={["technologies", "buzzwords", "timeline"]} elements={[["python", "numpy"], ["reinforcement learning", "Q-Learning","SARSA"], ["nov 19\' - dec 19\'"]]}>technologies</Overview>
				<CaseText title={"problem"}>This project involves optimizing traffic light controls. This is a real-life problem that is especially pertinent in congested cities. Inefficient traffic control systems are costly in many ways. While people and their vehicles are being stuck in traffic, their time is being wasted (usually at crucial times of the day, such as rush-hour), expensive fuel is being consumed, and harmful greenhouse gases are emitted. Great lengths have been taken to mitigate some of these effects (for example, auto stop-start systems have been a recent development); however, there is much work to be done. One obvious approach to reduce traffic congestion in the first place is by designing more efficient traffic control systems.</CaseText>
				<CaseText title={"methodology"}> We used Q-learning for training the agent. The Q-table is represented as a dictionary with the state value being the key, and its value being the A(s). ​By using a dictionary (a hash table) instead of an array, we were able to avoid storing entries until they were visited. ​This reduced memory usage as, in-practice, only 8-12% of the state space needed to be explored before convergence. We use a learning rate, ​α​, of 0.9; a discount factor, ​γ​, of 0.5; and an exploration rate, ​ε​ of 0.01. Additionally, we implemented a softmax policy to compare against the ​ε​-greedy policy. We decided to use Q-learning as we have a very large state space so bootstrapping would be preferable to keep training times reasonable.</CaseText>
				<CaseText title={"impact"}>
					The trained agent is able to efficiently control traffic in a robust manner. Despite having a great variation in the number of cars added to the environment (for example, during rush hour), the time cost per car stays relatively constant
					<br/><br/>
					In addition to modelling the movement of vehicles throughout the environment, the amount of carbon dioxide produced by each vehicle was also simulated. As is expected, utilization of the learning agent resulted not only in more efficient traffic control, but also resulted in less carbon dioxide being produced each day. The results of certain routes (either normal or loop) and policy being used (either softmax or ​ε-​ greedy) are similar to that of the results for the wait times discussed previously, with softmax performing better for the loop route, and ​ε-​ greedy performing better for the normal route.	
					<br/><br/>
					Working on a problem tied to a real-life application helps us see how reinforcement learning can be applied to improve real-world systems. Over the course of a 140 day run, our system was able to reduce carbon emissions by approximately 2000 kg over a naive agent for a car with a deterministic route. Our solution can be extended very easily to the real-world not only to reduce our carbon footprint, but also to save travel time for the everyday driver.
				</CaseText>
				<Footer to={"publicissapient"} linkTitle={"next"} />
			</div>
		)
	}
}
    
export default analytics(TrafficSimulation, "/trafficSim")
