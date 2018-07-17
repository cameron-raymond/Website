import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import '../../scenes/Home/Home.css'

/**
 * 
 */
class Home extends Component {
    render() {
        return (
            <div className="Container" style={{ position: 'relative',backgroundColor: this.props.backgroundColor, marginBottom: 0}} >
                {this.props.background}
                <div style={{ position: 'absolute', top: 10 }}>
                    <h1 style={{color: this.props.color}}>
                        {this.props.title}
                    </h1>
                    <div style={{ maxWidth: 580, flexShrink: 1, flexWrap: "wrap", color:this.props.color }}>
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
