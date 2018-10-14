import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Test from '../../components/Graphs/BackgroundGraphs/BackgroundArea';
import * as ScrollMagic from 'scrollmagic'
import './Home.css'

class Home extends Component {

    render() {
        return (
            <Card title={"Nice To Meet You"}
                background={<Test />}
            >
            Hi – my name is Cameron. I study computer science, with a minor in political studies, at Queen’s University. The things I love include; reading, exercising, and clever solutions to difficult problems.

            </Card>
        );
    }
}

export default Home;
