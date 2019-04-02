import React, { Component } from 'react';
import reveal from '../../Components/scrollReveal/Reveal'
import '../../Assets/standardized.css'
import './contact.css'

class CInfo extends Component {
    render() {
        return (
            <div className="tabOver">
                <p className="subtitle reduceSpace">Thanks for checking out my portfolio! All source code can be found on my         <a href="https://github.com/cameron-raymond" className="link">github</a>.</p>
                <p className="subtitle reduceSpace">Want to learn more? Let's grab coffee and chat; feel free to reach out at
          <a href="mailto:c.raymond@queensu.ca" className="link"> c.raymond@queensu.ca</a>,
           or <a href="https://linkedin.com/in/cameron-raymond/" className="link">linkedIn</a>.
          </p>
            </div>
        );
    }
}

export default reveal(CInfo);

