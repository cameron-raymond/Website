import React, { PureComponent } from 'react';
import './Intro.css';
import Loop from './LoopTypist'
import Typist from 'react-typist';


class Typing extends PureComponent {
  render() {
    return (
      <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={40} className="typist">
        <Typist.Delay ms={500} />

        <span>nice to meet you...</span>
        <Typist.Backspace count={20} delay={1500} />
        <Typist.Delay ms={500} />
        <span>my name is cameron...</span>
        <Typist.Backspace count={24} delay={1500} />
        <Typist.Delay ms={500} />
        <span>i am a </span>
        <Typist.Delay ms={500} />
        <span>student...</span>
        <Typist.Backspace count={10} delay={500} />
        <Typist.Delay ms={500} />
        <span>problem solver...</span>
        <Typist.Backspace count={17} delay={500} />
        <Typist.Delay ms={500} />
        <span style={{ color: '#000' }} className="marker">developer.</span>
        
        <span className="emphasis">
          <br />

          <span className="hidden">i am a </span>

          <span className="marker blue">problem solver.</span>
          <br />
          <span className="hidden">i am a </span>

          <span className="marker green">student.</span>
        </span>
      </Typist>
    );
  }
}

export default Typing;
