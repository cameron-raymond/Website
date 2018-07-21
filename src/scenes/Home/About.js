import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Test from '../../components/Graphs/BackgroundGraphs/BackgroundArea';
import * as ScrollMagic from 'scrollmagic'
import './Home.css'

class Home extends Component {
    componentDidMount() {
        const controller = new ScrollMagic.Controller();
        var ourScene = new ScrollMagic.Scene({
            triggerElement: '#about',
            triggerHook: 0.4,
        }).setClassToggle('#about','fade-in').addTo(controller)
    }
    render() {
        return (
            <div id="about" className="panel about">
                <Card title={"Nice To Meet You"}
                    content={"Hi -  my name is Cameron. I'm a student at Queen's University studying Computer Science, with a minor in Political Studies. The things I love include: spending time with friends, reading, exercising, and learning about clever solutions to difficult problems."}
                    background={<Test />}
                />
            </div>
        );
    }
}

export default Home;
