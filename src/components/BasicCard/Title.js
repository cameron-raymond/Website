import React, { Component } from 'react';
import './BasicCard.css'

/**
 * 
 */
class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="line" style={{borderColor: this.props.color}}></div><h1 className="title" style={{fontSize: 30, color: this.props.color}} >{this.props.children}</h1><div className="line" style={{borderColor: this.props.color}}></div>
            </div>
        );
    }
}

export default Home;
