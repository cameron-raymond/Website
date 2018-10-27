import React, { Component } from 'react';
import './Portfolio.css';
import { ParallaxLayer } from 'react-spring/dist/addons'
import Block from '../../Components/PortfolioBlock/Block'



class App extends Component {

  render() {
    return (
      <ParallaxLayer
        offset={1}
        onClick={this.props.onClick.bind(this)}
        className="portfolioCont"
      >
        <ParallaxLayer speed={-0.3}>
          <a href="www.github.com" onClick={e => e.stopPropagation()}>
            <Block title={"about"} align={"right"} />
          </a>
        </ParallaxLayer>
        <ParallaxLayer speed={0.3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Block title={"my work"} fgColour={"#8e8d8a"} bgColour={"#D8C3A5"} align={"left"} />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Block title={"contact"} align={"right"} />
        </ParallaxLayer>
      </ParallaxLayer >


    );
  }
}

export default App;
