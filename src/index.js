import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Components/header/Header'
import Intro from './Scenes/Intro/Intro';
import {Card} from './Components/card/Card'
import './index.css'
import ReactGA from 'react-ga';




class App extends React.Component {
  initializeReactGA() {
    ReactGA.initialize('UA-133541363-1');
    ReactGA.pageview('/homepage');
  }
  componentWillMount() {
    // this.initializeReactGA()
  }


  render() {
    return (
      <div>
        <Header />
       
        <Intro />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
