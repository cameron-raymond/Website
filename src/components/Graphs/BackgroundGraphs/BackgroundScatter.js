import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryScatter, VictoryStack,VictoryVoronoi, VictoryGroup } from 'victory';

var _ = require('lodash');



export default class Scatter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.getData()
        };
    }

    componentDidMount() {
        this.setStateInterval = window.setInterval(() => {
            this.setState({
                data: this.getData()
            });
        }, 3000);
    }

    componentWillUnmount() {
        window.clearInterval(this.setStateInterval);
    }

    getData() {
        const dots = _.random(6, 15);
        return _.range(dots).map((dot) => {
            return { x: dot + 1, y: _.random(2, 10) };
        });
    }
    render() {
        return (
            <VictoryGroup
                padding={0}
                height={250}
                domainPadding={{ x: 20, y: [4, 50] }}
                animate={{
                    duration: 2000 ,
                    onExit: {
                        duration: 500,
                        before: () => ({
                            _y: 0
                        })
                    }
                }}
                data={this.state.data}

            >
                {/* <VictoryVoronoi
                    style={{ data: { stroke: "#b1c3cc", strokeWidth: 2, strokeOpacity: 0.2 } }}
                  
                /> */}
                <VictoryScatter
                    style={{
                        data: { fill: "#b1c3cc" }
                    }}
                    
                />
            </VictoryGroup>
        );
    }
}

