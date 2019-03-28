import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import Header from './Components/header/Header'
import Home from'./Scenes/HomePage/Home';
import RecycleIt from './Scenes/RecycleIt/RecyleIt'
import DII from './Scenes/DigitalInsights/DigInsights'
import DistDeliveries from './Scenes/DistDeliveries/DistDeliveries'
import About from './Scenes/About/About'
import Contact from './Scenes/Contact/Contact'
import './index.css'

class Head extends React.Component {
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
      </div>
    )
  }
}



ReactDOM.render(<Router>
  <div>
    <div style={{position: 'sticky', top: 0}}><Head/></div>
    <Route exact path="/" component={Home} />
    <Route path="/recycleit" component={RecycleIt} />
    <Route path="/DII" component={DII} />
    <Route path="/distDeliveries" component={DistDeliveries} />
    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact}/>
  </div>
</Router> 
, document.getElementById('root'))
