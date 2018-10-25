import React from 'react'
import ReactDOM from 'react-dom'
import { Parallax, ParallaxLayer } from 'react-spring/dist/addons'
import Header from './Components/header/Header'
import Intro from './Scenes/Intro/Intro';
import Portfolio from './Scenes/Portfolio/Portfolio'
import Move from './Components/button/Button'
import './index.css'


// Little helpers ...
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <Header />
        </div>
        <Parallax ref={ref => (this.parallax = ref)} pages={3}>
          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => this.parallax.scrollTo(1)}
         >
            <Intro />
          </ParallaxLayer>

          <Portfolio onClick={() => this.parallax.scrollTo(0)}/>
          
        </Parallax>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
