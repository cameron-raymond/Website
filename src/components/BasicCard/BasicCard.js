import React, { Component } from 'react';
import './BasicCard.css'

/**
 * 
 */
class Home extends Component {
    render() {
        return (
            <div className="Container" style={{ position: 'relative',backgroundColor: this.props.backgroundColor}} >
                {this.props.background}
                <div style={{ position: 'absolute', top: 10 }}>
                    <h1 style={{color: this.props.color, fontSize: 30}}>
                        {this.props.title}
                    </h1>
                    <div style={{ maxWidth: 580, flexShrink: 1, flexWrap: "wrap", color:this.props.color ,margin: 0}}>
                        <p style={{color:this.props.color }}>
                            {this.props.content}
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
