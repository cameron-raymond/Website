import React, { Component } from 'react';
import './Intro.css';
import Button from '../../Components/button/Button'
import { Spring } from 'react-spring'
import Typing from './Typing'


class App extends Component {
  render() {
    return (
      <div className="container" >
        <div className="background">
          <div className="typePos"><Typing /></div>
          <div className="moveButton">
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              tension={120}
              friction={14}
              delay={19000}>
              {props => <div style={props}><Button /></div>}
            </Spring>

</div>
        </div>
      </div>
    );
  }
}

export default App;
