import React, { Component } from 'react';
import './vid.css'

class VidComp extends Component {

    render() {
        return (
            <video className='vidStyling' autoPlay loop muted>
                <source src={this.props.src} type='video/mp4' />
            </video>
        )
    }
};

export default VidComp;