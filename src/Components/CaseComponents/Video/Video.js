import React, { Component } from 'react';
import VidComp from './VidComponent'
import reveal from '../../HOC/scrollReveal/Reveal'
import styles from  './vid.module.css'
class Video extends Component {

    render() {
        return (
           <div className={styles.vidContainer}> 
                        <VidComp src={this.props.src}/>
                        <div className={styles.textStyling}>
                        <p className="serif marker reduceSpace tabOver">{this.props.title}</p>
                        <p className="text reduceSpace">{this.props.children}</p>
                
                        </div>
           </div>
         
        )
    }
};

export default reveal(Video);