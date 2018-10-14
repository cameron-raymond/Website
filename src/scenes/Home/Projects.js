import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Veronoi from '../../components/Graphs/BackgroundGraphs/BackgroundVeronoi'
import './Home.css'


class Project extends Component {
    render() {
        return (
            <Card title={"My Projects"}
            background={<Veronoi/>}
            >
                <p>Over the past couple of years I've worked on; an internal analytics app for CIBC, an analysis of Google Chrome's software architecture, and a web app which compares media sentiment. </p>        
        </Card>
        );
    }
}

export default Project;
