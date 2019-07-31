import React, { Component } from "react"
import { Helmet } from "react-helmet"
import analytics from "../../Components/HOC/analytics/Analytics"
import Intro from "./IntroAndImg"
import Overview from "../../Components/CaseComponents/Overview/Overview"
import Footer from "../../Components/Footer/Footer"

class About extends Component {
	render() {
		let books = [<a key={1} href="https://nyupress.org/9781479857593/we-are-data/">we are data</a>, <a key={2} href="https://www.penguinrandomhouse.ca/books/74189/the-reluctant-fundamentalist-by-mohsin-hamid/9780385663458">the reluctant fundamentalist</a>, <a key={3} href="https://www.penguinrandomhouse.ca/books/89308/thinking-fast-and-slow-by-daniel-kahneman/9780385676533">thinking fast and slow</a>, <a key={4}href="https://www.amazon.ca/Everybody-Lies-Internet-About-Really/dp/0062390856">everybody lies</a>, <a key={5}href="https://www.simonandschuster.com/books/Bowling-Alone/Robert-D-Putnam/9780743203043">bowling alone</a>]
		let allTimeAlbums = [<a key={1} href="https://pitchfork.com/reviews/albums/22035-the-miseducation-of-lauryn-hill/">the miseducation of lauryn hill</a>, <a key={2} href="https://pitchfork.com/reviews/albums/2pac-all-eyez-on-me/">all eyez on me</a>, <a key={3}href="https://pitchfork.com/reviews/albums/23125-this-old-dog/">this old dog</a>, <a key={4}href="https://pitchfork.com/reviews/albums/20390-to-pimp-a-butterfly/">to pimp a butterfly</a>, <a key={5}href="https://pitchfork.com/reviews/albums/9371-pet-sounds-40th-anniversary/">pet sounds</a>]
		let pastYearAlbums = [<a key={1} href="https://pitchfork.com/reviews/albums/sons-of-kemet-your-queen-is-a-reptile/">your queen is a reptile</a>, <a key={2} href="https://pitchfork.com/reviews/albums/kanye-west-kid-cudi-kids-see-ghosts/">kids see ghosts</a>, <a key={3} href="https://pitchfork.com/reviews/albums/parquet-courts-wide-awake/">wide awake!</a>, <a key={4} href="https://pitchfork.com/reviews/albums/black-sabbath-paranoid/">paranoid</a>]
		return (
			<div className="caseContainer">
				<Helmet>
					<title>About - Cameron Raymond</title>
					<meta name="description" content="Cameron Raymond is a software developer and student at Queen's University." />
				</Helmet>
				<Intro />
				<Overview headers={["what i'm reading", "what i'm listening to", "all time favourites"]}
					elements={[books, pastYearAlbums, allTimeAlbums]} />
				<Footer to={"contact"} linkTitle={"contact"} linkTitleMobile={"contact"} />
			</div>
		)
	}
}

export default analytics(About, "/about")
