import React, { Component } from 'react';
import './Portfolio.css';
import { Parallax, ParallaxLayer } from 'react-spring/dist/addons'


const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

class App extends Component {
  render() {
    return (
       <ParallaxLayer
            offset={1}
            speed={0.1}
            
            onClick={this.props.onClick.bind(this)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <img src={url('bash')} style={{ width: '40%' }} />
          </ParallaxLayer>
       
    );
  }
}

export default App;
