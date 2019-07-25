import React, { Component } from 'react';
import Typist from 'react-typist';
import analytics from '../../Components/HOC/analytics/Analytics'
import styles from './ps.module.css'

class PS extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30} className="serif reduceSpace">
                    <span>coming <span className="marker"> soon</span></span>
                </Typist>
                <div className="tabOver">
                    <p className="text reduceSpace">My first experience as a PM is still under wraps, but check back soon!</p>
                </div>
            </div>
        );
    }
}

export default analytics(PS, "/publicissapient");