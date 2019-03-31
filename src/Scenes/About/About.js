import React, { Component } from 'react';
import Intro from './IntroAndImg'
import Overview from '../../Components/CaseComponents/Overview/Overview'
import Footer from '../../Components/CaseComponents/Footer/Footer'
import '../../Assets/standardized.css'
import './about.css'

class About extends Component {
  render() {
    let books = [<a href="https://www.penguinrandomhouse.ca/books/74189/the-reluctant-fundamentalist-by-mohsin-hamid/9780385663458">the reluctant fundamentalist</a>, <a href="https://www.penguinrandomhouse.ca/books/89308/thinking-fast-and-slow-by-daniel-kahneman/9780385676533">thinking fast and slow</a>,<a href="https://www.amazon.ca/Everybody-Lies-Internet-About-Really/dp/0062390856">everybody lies</a>, <a href="https://www.simonandschuster.com/books/Bowling-Alone/Robert-D-Putnam/9780743203043">bowling alone</a>]
    let allTimeAlbums = [<a href="https://pitchfork.com/reviews/albums/22035-the-miseducation-of-lauryn-hill/">the miseducation of lauryn hill</a>, <a href="https://pitchfork.com/reviews/albums/2pac-all-eyez-on-me/">all eyez on me</a>, <a href="https://pitchfork.com/reviews/albums/23125-this-old-dog/">this old dog</a>, <a href="https://pitchfork.com/reviews/albums/20390-to-pimp-a-butterfly/">to pimp a butterfly</a>, <a href="https://pitchfork.com/reviews/albums/9371-pet-sounds-40th-anniversary/">pet sounds</a>]
    let pastYearAlbums = [<a href="https://pitchfork.com/reviews/albums/sons-of-kemet-your-queen-is-a-reptile/">your queen is a reptile</a>, <a href="https://pitchfork.com/reviews/albums/kanye-west-kid-cudi-kids-see-ghosts/">kids see ghosts</a>, <a href="https://pitchfork.com/reviews/albums/parquet-courts-wide-awake/">wide awake!</a>, <a href="https://pitchfork.com/reviews/albums/black-sabbath-paranoid/">paranoid</a>];
    return (
      <div className="caseContainer">
        <Intro />
        <Overview headers={["favourite books (past year)", "favourite albums (all time)", "favourite albums (past year)"]}
          elements={[books,allTimeAlbums,pastYearAlbums]}/>
              <Footer to={"contact"}linkTitle={"contact"} linkTitleMobile={"contact"}/>

      </div>
    );
  }
}

export default About;