import React, { Component } from 'react';
import './Portfolio.css';
import { ParallaxLayer } from 'react-spring/dist/addons'
// import {Modal} from './Modal'
import Block from '../../Components/PortfolioBlock/Block'



export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {  ph: "TEST",
                    info: null 
  };
  }
  updateState = (event) => {
    event.stopPropagation()
    this.setState({ ph: this.state.ph + " AND NOW" })
  }

  updateText = (text) => {
    this.setState({ info: text })
  }
  cleanSlate = () => {
    this.setState({ info: null })
  }
  
  render() {
    const myWork = 'The areas of study that peak my interest are discrete math, graph theory, and formal logic. I am looking forward to taking a deeper dive into statistics, data science, and artificial intelligence for the rest of my undergrad. \n\n In the summer of 2018 I worked at CIBC, Digital Insights and Analytics, developing analytics solutions using Python and React Native.'
    const about = 'Hi – my name is Cameron. I study computer science, with a minor in political studies, at Queen’s University. The things I love include; reading, exercising, and clever solutions to difficult problems.'
    const getInTouch = "If you have any questions about me, or would like to reach out, feel free."

    return (
      <ParallaxLayer
        offset={1}
        onClick={this.props.onClick.bind(this)}
        className="portfolioCont"
      >

         {this.state.info ? <div style={{position:'absolute', marginTop: 30, width: '50%',height:'50%',backgroundColor:'#D8C3A5', display: 'flex',flexDirection: 'row', justifyContent: 'center', paddding: 10, zIndex: 999}}> <p>{this.state.info}</p></div> : null}
        <ParallaxLayer speed={0} style={{ display: 'flex', height: '33%', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Block title={"about"} align={"right"}  onMouseEnter={() => this.updateText(about)} onMouseLeave={this.cleanSlate}/>
          
          <Block title={"my work"} fgColour={"#8e8d8a"} bgColour={"#D8C3A5"} align={"left"} onMouseEnter={() => this.updateText(myWork)} onMouseLeave={this.cleanSlate} />

        </ParallaxLayer>

        <ParallaxLayer speed={-0.5} style={{ display: 'flex', height: '20%', paddingLeft: '10%', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Block title={"contact"} align={"left"} mutate={"Wide"} onMouseEnter={() => this.updateText(getInTouch)} onMouseLeave={this.cleanSlate} />
        </ParallaxLayer>
      </ParallaxLayer >

    );
  }
}
