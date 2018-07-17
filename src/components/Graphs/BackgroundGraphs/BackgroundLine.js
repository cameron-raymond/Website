import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryLine, VictoryStack } from 'victory';

var _ = require('lodash');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: this.getData() };
    }

    componentDidMount() {
        var interval = _.random(3000,5000)
        this.setStateInterval = window.setInterval(() => {
            this.setState({ data: this.getData() });
        }, interval);
    }

    getData() {
        return _.range(7).map(() => {
            return [
                { x:  1, y: _.random(1,90) },
                { x:  2, y: _.random(1, 60) },
                { x:  3, y: _.random(1, 65) },
                { x:  4, y: _.random(1, 80) },
                { x:  5, y: _.random(2, 80) },
                { x:  6, y: _.random(1, 90) },
                { x: 7, y: _.random(1, 150) },
                { x: 8, y: _.random(2, 100) }
            ];
        });
    }

    render() {
        return (
            <VictoryStack
                padding={0}
                height={230}
                animate={{ duration: 7000 }}
                colorScale={[ "#4C5C6A","#E9E9E9", "#95A7B0", "#CECECE", "#DEDFDF","#456179",
                "#b1c3cc",
                "#00455c",
                "#95c6e0",
                "#547e88",
                "#5fa5ca",
                "#91a6bb"]}
            >
                {this.state.data.map((data, i) => {
                    return (
                        <VictoryLine
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

