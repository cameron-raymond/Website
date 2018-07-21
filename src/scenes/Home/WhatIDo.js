import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Line from '../../components/Graphs/BackgroundGraphs/BackgroundLine';
import * as ScrollMagic from 'scrollmagic'
import './Home.css'

class WhatIDo extends Component {

    render() {
        return (

            <Card title={"What I Do"}
                content={"Lorem Ipsum write about what you like to do"}
                background={<Line />}
                color={"#E9E9E9"}
                backgroundColor={"#4C5C6A"}
            />
        );
    }
}

export default WhatIDo;
