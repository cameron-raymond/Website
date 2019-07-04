import React, { PureComponent } from 'react';
import reveal from '../../Components/HOC/scrollReveal/Reveal'

class RevAbout extends PureComponent {
    render() {
        return (
            <div className="tabOver">
                <p className="text">I’m a 20 year old software developer from Toronto,
 Ontario - currently studying computer science, with
 a minor in political studies at Queen’s University.
<br />
                    <br />

                    Some of the courses I’ve enjoyed during my undergrad
                    are <a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-235.html">Data Structures</a>; <a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-365.html">Algorithms</a>; <a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-204.html">Formal Logic</a>; States,
                    Diversity and Ethnic Conflict; and <a href="http://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-352.html">Artificial Intelligence</a>.
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

