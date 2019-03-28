import React, { PureComponent } from 'react';
import './Intro.css';
import '../../Assets/standardized.css'
import Typist from 'react-typist';


class Typing extends PureComponent {
  render() {
    return (
      <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="typist serif primary">
        <Typist.Delay ms={500} />

        <span>nice to meet you, </span>
        <Typist.Delay ms={500} />
        <span>my name is </span>
        <span className="marker">cameron</span>
        
        <Typist.Delay ms={800} />
        <br/>
        <span>i am a </span>
        <span className="marker">software developer, </span>
        <Typist.Delay ms={500} />
        <span> and <span className="marker">student</span> </span>
        <Typist.Delay ms={200} />
        <span>at Queen's University </span>

      </Typist>
    );
  }
}

export default Typing;
