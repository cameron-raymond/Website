import React, { Component } from 'react';
import VidComp from './VidComponent'
import './vid.css'
class Video extends Component {

    render() {
        return (
           <div className="vidContainer"> 
                        <VidComp src={this.props.src}/>
                        <div className="textStyling">
                        <p className="serif marker reduceSpace tabOver">{this.props.title}</p>
                        <p className="subtitle reduceSpace">{this.props.children}</p>
                
                        </div>

           </div>
         
        )
    }
};

export default Video;