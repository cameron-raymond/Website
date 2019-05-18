import React, { PureComponent } from 'react';
import Typist from 'react-typist';
import './title.css'
import '../../../Assets/standardized.css'

class Title extends PureComponent {
  render() {
    return (
      <div className="caseTitle">
        <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="serif primary">
          <p className="serif primary marker reduceSpace">{this.props.title}</p>
          <br/>
          <span className="text reduceSpace">{this.props.children}</span>
        </Typist>
      </div>
    );
  }
}

export default Title;
