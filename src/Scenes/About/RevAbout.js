import React, { Component } from 'react';
import reveal from '../../Components/scrollReveal/Reveal'
import '../../Assets/standardized.css'
import './about.css'

class RevAbout extends Component {
    render() {
        return (
            <div className="tabOver">
                <p className="subtitle">I’m a 20 year old software developer from Toronto,
 Ontario - currently studying computer science, with
 a minor in political studies at Queen’s University.
<br />
                    <br />

                    Some of the courses I’ve enjoyed during my undergrad
                    are Data Structures; Algorithms; Formal Logic; States,
                    Diversity and Ethnic Conflict; and Artificial Intelligence.
<br />
                    <br />

                    10 years from now I hope to have completed graduate
                    school and be working to help inform public policy
                    through technology.
 <br />
                    <br />

                    In my spare time I love reading, exercising and spending
                    time with loved ones.
</p>
            </div>
        );
    }
}

export default reveal(RevAbout);

