import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Line from '../../components/Graphs/BackgroundGraphs/BackgroundLine';
import * as ScrollMagic from 'scrollmagic'
import './Home.css'

class WhatIDo extends Component {

    render() {
        return (

            <Card title={"What I Do"}
                background={<Line />}
                color={"#E9E9E9"}
                backgroundColor={"#4C5C6A"}
            >
Lorem ipsum I'm not a waste.            
            </Card>
        );
    }
}

export default WhatIDo;
