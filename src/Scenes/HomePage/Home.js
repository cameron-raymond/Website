import React from 'react'
import analytics from '../../Components/HOC/analytics/Analytics'
import Intro from './Intro/Intro';
import Portfolio from './PortfolioOverview/Portfolio'
import Footer from '../../Components/Footer/Footer'

class Home extends React.Component {

  render() {
    return (
      <div className="caseContainer">
        <Intro />
        <Portfolio/>
        <Footer to={"contact"}linkTitle={"contact"} linkTitleMobile={"contact"}/>
      </div>
    )
  }
}

export default analytics(Home,"/home");
