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
                <div><p>The areas of study that pique my interest are discrete math, graph theory, and formal logic. </p>
                    <p>  I'm looking forward to taking a deeper dive into statistics, data science, and artificial intelligence for the rest of my undergrad.
                  In the summer of 2018 I worked at CIBC, Digital Insights and Analytics, developing analytics solutions using Python and React Native.
</p>
                </div>
            </Card>
        );
    }
}
 
export default WhatIDo;
