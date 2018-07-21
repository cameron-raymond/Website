import React, { Component } from 'react';
import Title from './Title'
import './BasicCard.css'

/**
 * 
 */
class Home extends Component {
    render() {
        return (
            <div className="Container" style={{ position: 'relative',backgroundColor: this.props.backgroundColor}} >
                {this.props.background}
                {/* //test */}
                <div style={{ position: 'absolute', top: 10 }}>
                    <Title color={this.props.color} >{this.props.title}</Title>
                    <div style={{ maxWidth: 580, flexShrink: 1, flexWrap: "wrap", color:this.props.color ,margin: 0}}>
                        <p className="text" style={{color:this.props.color }}>
                            {this.props.content}
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
