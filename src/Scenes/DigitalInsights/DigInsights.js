import React, { Component } from 'react';
import './digInsights.css'
import Title from '../../Components/CaseComponents/Title/Title'
import Image from '../../Components/CaseComponents/Image/Image'
import Overview from '../../Components/CaseComponents/Overview/Overview'
import mockup from '../../Assets/DII/Mockup.JPG'
class DII extends Component {
  render() {
    return (
      <div className="digInsightsContainer">
        <Title title={"Digital Insights and Integration App"}>
          convenient and comprehensive retail banking analytics
        </Title>
        <Image src={mockup}/>
        <Overview headers={["technologies","buzzwords","timeline"]} elements={[["react native","firebase","python"],["data analytics","data visualization"],["june 18'-august 18"]]}>technologies</Overview>
      </div>
    );
  }
}

export default DII;
