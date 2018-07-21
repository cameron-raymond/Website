import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Scatter from '../../components/Graphs/BackgroundGraphs/BackgroundScatter'
import Typography from '@material-ui/core/Typography';

class More extends Component {
    render() {
        return (
                <Card title={"More"}
                    content={"Lorem Ipsum give me a job please"}
                    background={<Scatter />}
                    backgrounColor={"#DEDFDF"}
                />
        );
    }
}

export default More;
