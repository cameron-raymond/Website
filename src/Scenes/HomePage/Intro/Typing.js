import React, { PureComponent } from "react"
import Typist from "react-typist"
import styles from "./Intro.module.css"


class Typing extends PureComponent {
	render() {
		return (
			<h1> 
				<Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className={styles.typist}>
					<Typist.Delay ms={500} />

					<span>nice to meet you, </span>
					<Typist.Delay ms={500} />
					<span>my name is </span>
					<span className="marker">cameron</span>
					<Typist.Delay ms={800} />
					<br />
					<span>i am a </span>
					<span className="marker" >software developer, </span>
					<Typist.Delay ms={500} />
					<span> and <span className="marker">student</span> </span>
					<Typist.Delay ms={200} />
					<span>at Queen&apos;s University </span>
					<Typist.Delay ms={800} />
					<br />
					<span className="text">curently applying to <span className="italic">graduate school</span> and looking for <span className="italic">summer 2020</span> opportunities</span>
				</Typist>
			</h1>
		)
	}
}

export default Typing
