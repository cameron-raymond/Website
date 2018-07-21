import React, { Component } from 'react';
import Card from '../../components/BasicCard/BasicCard'
import Scatter from '../../components/Graphs/BackgroundGraphs/BackgroundScatter'
import Typography from '@material-ui/core/Typography';

class More extends Component {
    render() {
        return (
                <Card title={"Let's Get In Touch"}
                    background={<Scatter />}
                    backgrounColor={"#DEDFDF"}
                >
                Lorem Ipsum give me a job please
                </Card>
        );
    }
}

export default More;
