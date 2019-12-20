import React, { PureComponent } from "react"
import reveal from "../../Components/HOC/scrollReveal/Reveal"

class RevAbout extends PureComponent {
	render() {
		return (
			<div className="tabOver">
				<p className="text">I’m a 21 year old data enthusiast from Toronto,
 Ontario - currently studying computer science, with
 a minor in political studies at Queen’s University.
				<br />
				<br />
					My broad areas of interest include network science, machine learning, and computer science's applications in the social sciences.
					Some of the courses that I've found helpful in this pursuit are 
				<a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-452.html"> Neural and Genetic Computing</a>; 
				<a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-474.html"> Reinforcement Learning</a>; 
				<a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-365.html"> Algorithms </a>; 
					 States, Diversity and Ethnic Conflict; 
					and <a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-352.html"> Artificial Intelligence</a>.
				<br />
				<br />

					10 years from now I hope to have completed graduate
                    school and be working to help inform public policy
                    through technology.
				<br />
				<br />

					In my spare time I love reading, exercising and spending
                    time with loved ones.
				</p>
			</div>
		)
	}
}

export default reveal(RevAbout,false)

