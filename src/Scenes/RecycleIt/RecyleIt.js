import React, { Component } from 'react';
import analytics from '../../Components/HOC/analytics/Analytics'
import Title from '../../Components/CaseComponents/Title/Title'
import Image from '../../Components/CaseComponents/Image/Image'
import Video from '../../Components/CaseComponents/Video/Video'
import Overview from '../../Components/CaseComponents/Overview/Overview'
import userFlow from '../../Assets/RIT/RItVideo.mp4'
import mockup from '../../Assets/RIT/RItmockup.webp'
import altMockup from '../../Assets/RIT/RItmockup.png';
import CaseText from '../../Components/CaseComponents/TextSection/CaseText'
import Footer from '../../Components/CaseComponents/Footer/Footer'
import '../../Assets/standardized.css'

class RecycleIt extends Component {
  render() {
    return (
      <div className="caseContainer">
        <Title title={"RecycleIt."}>
          the app that uses computer vision to help reduce recycling contamination        </Title>
        <Image altSrc={altMockup} src={mockup} />
        <Overview headers={["technologies", "buzzwords", "timeline"]} elements={[["react native", "clarifai"], ["artificial intelligence", "computer vision"], ["december 18'-february 19'"]]}>technologies</Overview>
        <CaseText title={"problem"}>Landfills produce approximately <a href="http://districtofstewart.com/citizen-services/garbage-pick-up-and-recycling/garbage-and-recycling-statistics">25% of Canada’s methane emissions</a>, and recycling is a key component in reducing the waste that ends up in landfills. However, when a piece of garbage is accidentally thrown into the recycling bin, it’s a costly and labour intensive process to identify it, and transport it to a landfill. Therefore, reducing the contamination rates at the level of the user is a key aspect in making recycling cheaper, and more effective.</CaseText>
        <CaseText title={"methodology"}>	Recycling contamination is primarily the result of a lack of information about what can be recycled. Canadians are throwing too much garbage into recycling bins, so there needs to be a shift in mindset: from recycling more, to recycling better. Wisdom can be drawn from the UK’s<a href="https://www.behaviouralinsights.co.uk/wp-content/uploads/2015/07/BIT-Publication-EAST_FA_WEB.pdf"> Nudge Unit</a>, who found that affecting social change requires making a behaviour easier, more attractive, more social and more timely.</CaseText>

        <Video src={userFlow} title="ease of use"> "The goal was to go from opening the app, to a solution in as few taps as possible." </Video>
        <CaseText title={"solution"}>
          Ease of use, accessibility and timeliness were identified as the three main criteria for a successful proof of concept. Therefore, a simple ‘snapchat’ style app, where the user takes a picture and receives a classification on how to dispose of an item can provide information at the critical part of the disposal process: when someone makes the decision to recycle or throw away an object.
          <br />
          <br />
          The goal was to go from opening the app, to a solution in as few taps as possible. So the decided user flow started with the user opening the app, and then using the primary button to take a picture with no extraneous steps. The app was built using React Native for its cross-platform functionality to allow for a broader reach.
          <br />
          <br />
          Clarifai’s computer vision API was trained on a 2,527 examples of cardboard, glass, metal, paper, plastic and trash to provide a granular view of how to dispose of specific items. Further improvements would be training a model locally (using Tensorflow) and then injecting the MLP’s weights into the React Native app - this would allow for quicker response time, offline use, and greater hyperparameter tuning.
          </CaseText>
        <CaseText title={"impact"}>
          The resulting app is simple to use, gives a response in &lt;10s and can classify objects with a relatively high degree of accuracy. It also highlights some of computer vision’s shortcomings. Objects like burrito wrappers are hard for humans to classify as recycling or garbage because they look like recycling. It requires extra domain knowledge to know that they are in-fact not recyclable. Therefore, to help protect against edge cases that a model would misclassify, extra domain information would be a valuable addition to help provide greater context to the user.
        </CaseText>
        <Footer to={"distDelivery"} linkTitle={"what else ya got"} linkTitleMobile={"next"} />
      </div>
    );
  }
}

export default analytics(RecycleIt,"/recycleIt");
