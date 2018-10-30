import React, { Component } from 'react';
import './Portfolio.css';
import { ParallaxLayer } from 'react-spring/dist/addons'
import Block from '../../Components/PortfolioBlock/Block'



export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { ph: "TEST" };
  }
  updateState = (event) =>{
    event.stopPropagation()
    this.setState({ph: this.state.ph+" "+this.state.ph})
  }
  render() {
    return (
      <ParallaxLayer
        offset={1}
        onClick={this.props.onClick.bind(this)}
        className="portfolioCont"
      >
      <p>{this.state.ph}</p>
          <ParallaxLayer speed={0} style={{display:'flex',height:'33%' ,flexDirection:'row', justifyContent: 'space-around'}}>
              <Block title={"about"} align={"right"} onClick={this.updateState}/>
              <Block title={"my work"} fgColour={"#8e8d8a"} bgColour={"#D8C3A5"} align={"left"} onClick={this.updateState} />

          </ParallaxLayer>
         
          <ParallaxLayer speed={-0.5} style={{display:'flex',height:'20%' ,paddingLeft:'10%',flexDirection:'row', justifyContent: 'flex-start'}}>
            <Block title={"contact"} align={"left"} mutate={"Wide"} onClick={this.updateState} />
          </ParallaxLayer>
      </ParallaxLayer >

    );
  }
}
