import React, { Component } from 'react';
import './Portfolio.css';
import { Trail, animated } from 'react-spring'

import { ParallaxLayer } from 'react-spring/dist/addons'
import Block from '../../Components/PortfolioBlock/Block'



export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      info: null,
      coords: [0, 0],

    };
  }
  handleMouseMove = ({ pageX, pageY }) => this.setState({ coords: [pageX, pageY] })

  transform = (x, y) => `translate3d(${x - 35}px, ${y - 35}px, 0)`
  componentDidMount = () => window.addEventListener('mousemove', this.handleMouseMove)

  updateText = (text) => {
    if (this.state.info !== text){
      this.setState({ info: text })
    }
  }
  cleanSlate = () => {
    this.setState({ info: null })
  }

  render() {
    const myWork = <div> <p>The areas of study that peak my interest are discrete math, graph theory, and formal logic. I am looking forward to taking a deeper dive into statistics, data science, and artificial intelligence for the rest of my undergrad.</p><p>In the summer of 2018 I worked at CIBC, Digital Insights and Analytics, developing analytics solutions using Python and React Native.</p></div>
    const about = 'Hi – my name is Cameron. I study computer science, with a minor in political studies, at Queen’s University. The things I love include; reading, exercising, and clever solutions to difficult problems.'
    const getInTouch = "If you have any questions about me, or would like to reach out, feel free."

    return (
      <React.Fragment>
        <ParallaxLayer
          offset={1}
          onClick={this.props.onClick.bind(this)}
          className="portfolioCont"
        >

          {/* {this.state.info ? <div style={{ position: 'absolute', right: '20%', marginTop: 30, width: '50%', backgroundColor: '#D8C3A5', padding: 10, zIndex: 999 }}> <p>{this.state.info}</p></div> : null} */}
          <ParallaxLayer speed={0} style={{ display: 'flex', height: '33%', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Block title={"about"} align={"right"} onMouseEnter={() => this.updateText(about)} />

            <Block title={"my work"} fgColour={"#8e8d8a"} bgColour={"#D8C3A5"} align={"left"} onMouseEnter={() => this.updateText(myWork)} />

          </ParallaxLayer>

          <ParallaxLayer speed={-0.5} style={{ display: 'flex', height: '20%', paddingLeft: '10%', flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Block title={"contact"} align={"left"} mutate={"Wide"} onMouseEnter={() => this.updateText(getInTouch)} />
          </ParallaxLayer>
        </ParallaxLayer >
        {this.state.info ? 
        <Trail native items={[this.state.info]} to={this.state}>
          {(item) => props => (
            <animated.div
              style={{
                marginTop: '100vh', width: '50%', backgroundColor: '#D8C3A5', padding: 10, zIndex: 999, transform: props.coords.interpolate(this.transform)
              }}>
              {item}
            </animated.div>
          )}
        </Trail> 
        : null}
      </React.Fragment>

    );
  }
}

// class Trailing extends React.Component {
//   state = {
//     coords: [0, 0],
//     info: this.props.info
//   }
//   handleMouseMove = ({ pageX, pageY }) => this.setState({ coords: [pageX, pageY] })

//   transform = (x, y) => `translate3d(${x - 35}px, ${y - 35}px, 0)`
//   componentDidMount = () => window.addEventListener('mousemove', this.handleMouseMove)
//   render() {
//     return (
//       <Trail native items={[this.state.info]} to={this.state}>
//         {(item) => props => (
//           <animated.div
//             style={{
//               width: '50%', backgroundColor: '#D8C3A5', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 10, zIndex: 999,
//               transform: props.coords.interpolate(this.transform)
//             }}>
//             {item}
//           </animated.div>
//         )}
//       </Trail>

//     )
//   }
// }
