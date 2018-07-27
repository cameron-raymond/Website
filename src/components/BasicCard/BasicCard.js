import React, { Component } from 'react';
import Title from './Title'
import './BasicCard.css'
import * as ScrollMagic from 'scrollmagic'

/**
 * 
 */
class Home extends Component {
    componentDidMount() {
        const controller = new ScrollMagic.Controller();
        var ourScene = new ScrollMagic.Scene({
            triggerElement: '#content',
            triggerHook: 1,
        }).setClassToggle('#content','fade-in').addTo(controller)
    }
    render() {
        return (
            <div className="card" style={{ position: 'relative',backgroundColor: this.props.backgroundColor}} >
                {this.props.background}
                <div id="content" className="content" style={{ position:'absolute' , top: 10 }}>
                    <Title color={this.props.color} >{this.props.title}</Title>
                    <div style={{ maxWidth: 600, flexShrink: 1, flexWrap: "wrap", color:this.props.color ,margin: 0}}>
                        <p className="text" style={{color:this.props.color }}>
                            {this.props.children}
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
