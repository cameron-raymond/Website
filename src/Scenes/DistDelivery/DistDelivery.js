import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import analytics from '../../Components/HOC/analytics/Analytics'
import Title from '../../Components/CaseComponents/Title/Title'
import Image from '../../Components/CaseComponents/Image/Image'
import Video from '../../Components/CaseComponents/Video/Video'
import Overview from '../../Components/CaseComponents/Overview/Overview'
import CaseText from '../../Components/CaseComponents/TextSection/CaseText'
import Footer from '../../Components/CaseComponents/Footer/Footer'
import userFlow from '../../Assets/distDelivery/ddVideo.mp4'
import mockup from '../../Assets/distDelivery/ddMockUp.webp'
import altMockup from '../../Assets/distDelivery/ddMockUp.png'
class DistDelivery extends Component {
  render() {
    return (
      <div className="caseContainer">
         <Helmet>
          <title>Distributed Delivery - Cameron Raymond</title>
          <meta name="description" content="A React app developed, in part, by Cameron Raymond that pairs users who need items shipped, with drivers already going in that direction." />
        </Helmet>
        <Title title={"Distributed Delivery"}>
          pairing users who need items shipped, with drivers already going in that direction
         </Title>
        <Image src={mockup}  altSrc={altMockup}/>
        <Overview headers={["technologies","buzzwords","timeline"]} elements={[["react.js","firebase"],["artificial intelligence","sharing economy"],["february 2-4, 19'"]]}>technologies</Overview>
        <CaseText title={"problem"}>
          There are 33.8 million vehicles in Canada, and 100+ million parcels delivered each year. The result is a potentially enormous amount of unused trunk space, and thus a new potential market. This is what my teammates and I realized on the Friday of QHacks, 2019. We wanted to do something novel, that didn’t follow a typical hackathon project template and actually address a problem. Distributed Delivery was born out of a teammate's anecdote about the pain of shipping his desktop computer from Calgary to Kingston in a move. This got us thinking about all the people who drive every day with room in their trunk space, who would probably be willing to pick up a package from someone and deliver it if they were already going in that direction. And that there is a potential for technology to address these compatible intrests.
        </CaseText>
        <CaseText title={"methodology"}> 
        There are two problems that Distributed Delivery attempts to address, the rising cost of shipping and the current wealth of unused trunk space. A platform to address these issues must connect those looking to ship items and drivers willing to pick up and deliver them. Furthermore, it should be done in a way that encourages trust and is convenient for both types of users. This blueprint for Distributed Delivery draws on current trends in sharing economies and allows users to earn extra income on an ad-hoc basis.  
        </CaseText>
        <Video src={userFlow} title="timely"> 
        "Distributed Delivery draws on current trends in sharing economies and allows users to earn extra income on an ad-hoc basis." 
        </Video>
        <CaseText title={"solution"}>
        Due to the time constraints of a weekend hackathon and the relative lack of web dev experience on my team we agreed that the front-end had to be simple, quick to use, and have minimal steps between the start of the form and end result. Therefore, we decided on a React.js frontend and firebase backend to store user information. After the user completes the form they are matched with a driver who’s driving that distance, during the timeframe specified. Drivers are paid a variable amount depending on the distance they drive, how far out of the way they have to go to deliver the package, and how many other drivers are listed. To request a deliver, or enroll to deliver, can be done in 5 steps and under a minute. 
        </CaseText>
        <CaseText title={"impact"}>	The resulting app has a pleasant, fluid, user experience and is a simple alternative to traditional shipping methods. Due to our team’s ethos of making better use of available space, we were awarded as one of the top 2 projects that foster sustainable cities through the use of artificial intelligence by Telus. </CaseText>

        <Footer to={"contact"}linkTitle={"let's chat"} linkTitleMobile={"let's chat"} />
      </div>
    );
  }
}

export default analytics(DistDelivery,"/distDelivery");