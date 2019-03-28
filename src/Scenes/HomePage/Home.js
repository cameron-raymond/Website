import React from 'react'
import Intro from './Intro/Intro';
import Portfolio from './PortfolioOverview/Portfolio'

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Intro />
        <Portfolio/>
      </div>
    )
  }
}

