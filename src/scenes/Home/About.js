import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Test from '../../components/Graphs/BackgroundGraphs/BackgroundArea';
import './Home.css'

class Home extends Component {
    render() {
        return (
                <Card title={"Nice To Meet You"}
                    content={"Hi -  my name is Cameron. I'm a student at Queen's University studying Computer Science, with a minor in Political Studies. The things I love include: spending time with friends, reading, exercising, and learning about clever solutions to difficult problems."}
                    background={<Test />} 
                    />
        );
    }
}

export default Home;
