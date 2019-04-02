import React, { Component } from 'react';
import '../../../Assets/standardized.css'
import reveal from '../../HOC/scrollReveal/Reveal'
import './casetext.css'

class CaseText extends Component {
  render() {
    return (
        <div className="cTextCont">
            <p className="serif marker reduceSpace">{this.props.title}</p>
            <div className="infoCont">
                <p className="subtitle reduceSpace">{this.props.children}</p>
            </div>
        </div>
    )
  }
}
export default reveal(CaseText);



