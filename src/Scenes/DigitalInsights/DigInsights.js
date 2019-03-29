import React, { Component } from 'react';
import './digInsights.css'
import Title from '../../Components/CaseComponents/Title/Title'
import Image from '../../Components/CaseComponents/Image/Image'
import Overview from '../../Components/CaseComponents/Overview/Overview'
import mockup from '../../Assets/DII/Mockup.JPG'
import CaseText from '../../Components/CaseComponents/TextSection/CaseText'
import Footer from '../../Components/CaseComponents/ViewNext/ViewNext'
class DII extends Component {
  render() {
    return (
      <div className="digInsightsContainer">
        <Title title={"Digital Insights and Integration App"}>
          convenient and comprehensive retail banking analytics
        </Title>
        <Image src={mockup}/>
        <Overview headers={["technologies","buzzwords","timeline"]} elements={[["react native","firebase","python"],["data analytics","data visualization"],["june 18'-august 18"]]}>technologies</Overview>
        <CaseText title={"problem"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CaseText>
        <CaseText title={"methodology"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CaseText>
        <CaseText title={"solution"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CaseText>
        <CaseText title={"impact"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CaseText>
        <Footer/>
      </div>
    );
  }
}

export default DII;
