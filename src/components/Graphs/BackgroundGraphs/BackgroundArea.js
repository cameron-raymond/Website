import React, { Component } from 'react';
import { VictoryArea, VictoryStack, VictoryLine } from 'victory';
import './Graph.css'

var _ = require('lodash');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: this.getData() };
    }

    componentDidMount() {
        this.setStateInterval = window.setInterval(() => {
            this.setState({ data: this.getData() });
        }, 6000);
    }

    getData() {
        return _.range(7).map(() => {
            return [
                { x: 1, y: _.random(1, 70) },
                { x: 2, y: _.random(1, 120) },
                { x: 3, y: _.random(1, 100) },
                { x: 4, y: _.random(1, 80) },
                { x: 5, y: _.random(2, 80) },
                { x: 6, y: _.random(1, 90) },
                { x: 7, y: _.random(1, 100) },
                { x: 8, y: _.random(2, 150) }
            ];
        });
    }

    render() {
        return (
                <VictoryStack
                    padding={0}
                    domainPadding={0}
                    // height={300}
                    animate={{ onEnter: 20000, duration: 6200 }}
                    colorScale={["#4C5C6A", "#E9E9E9", "#95A7B0", "#CECECE", "#DEDFDF", "#456179",
                        "#b1c3cc",
                        "#00455c",
                        "#95c6e0",
                        "#547e88",
                        "#5fa5ca",
                        "#91a6bb"]}
                >
                    {this.state.data.map((data, i) => {
                        return (
                            <VictoryArea
                                key={i}
                                data={data}
                                interpolation={"basis"}
                            />
                        );
                    })}
                </VictoryStack>
        );
    }
}

