import React, { Component } from 'react';
import reveal from '../../HOC/scrollReveal/Reveal'
import styles from './casetext.module.css'

class CaseText extends Component {
  render() {
    return (
        <div className={styles.cTextCont}>
            <p className="serif marker reduceSpace">{this.props.title}</p>
            <div className={styles.infoCont}>
                <p className="text reduceSpace">{this.props.children}</p>
            </div>
        </div>
    )
  }
}
export default reveal(CaseText);



