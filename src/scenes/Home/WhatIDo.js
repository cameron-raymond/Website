import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Line from '../../components/Graphs/BackgroundGraphs/BackgroundLine';
import './Home.css'

class WhatIDo extends Component {
    render() {
        return (

            <Card title={"What I Do"}
                background={<Line />}
                color={"#E9E9E9"}
                backgroundColor={"#4C5C6A"}
            >
                <div>
                    <p>  I'm looking forward to taking a deeper dive into statistics, data science, and artificial intelligence for the rest of my undergrad.
                  In the summer of 2018 I worked at CIBC, Digital Insights and Analytics, developing analytics solutions using Python and React Native.
                  
</p>
                </div>
            </Card>
        );
    }
}
 
export default WhatIDo;
