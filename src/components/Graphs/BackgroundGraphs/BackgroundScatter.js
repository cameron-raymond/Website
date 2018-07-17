import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryScatter, VictoryStack, VictoryGroup } from 'victory';

var _ = require('lodash');

// export default class Scatter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { data: this.getData() };
//     }

//     componentDidMount() {
//         this.setStateInterval = window.setInterval(() => {
//             this.setState({ data: this.getData() });
//         }, 10000);
//     }

//     getData() {
//         return _.range(_.random(1, 10)).map(() => {
//             return [
//                 { x: _.random(1, 10), y: _.random(1, 90) },
//                 { x: _.random(1, 10), y: _.random(1, 60) },
//                 { x: _.random(1, 10), y: _.random(1, 60) },
//                 { x: _.random(1, 10), y: _.random(1, 80) },
//                 { x: _.random(1, 10), y: _.random(2, 80) },
//             ];
//         });
//     }

//     render() {
//         return (
//             <VictoryStack
//                 padding={0}
//                 height={230}
//                 animate={{ duration: 7000 }}
//                 colorScale={["#4C5C6A", "#E9E9E9", "#95A7B0", "#CECECE", "#DEDFDF", "#456179",
//                     "#b1c3cc",
//                     "#00455c",
//                     "#95c6e0",
//                     "#547e88",
//                     "#5fa5ca",
//                     "#91a6bb"]}
//             >
//                 {this.state.data.map((data, i) => {
//                     return (
//                         <VictoryScatter
//                             key={i}
//                             data={data}
//                             interpolation={"basis"}
//                             animate={{
//                                 onExit: {
//                                     duration: 7000,
//                                     before: () => ({
//                                         _y: 0,
//                                     })
//                                 }
//                             }}
//                         />
//                     );
//                 })}
//             </VictoryStack>
//         );
//     }
// }

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
                height={230}

                domainPadding={{ x: 20, y:[4,50] }}
                animate={{ duration: 500 }}
            >
                <VictoryScatter
                    data={this.state.data}
                    style={{
                        data: { fill: "#b1c3cc"}
                    }}
                    animate={{
                        onExit: {
                            duration: 500,
                            before: () => ({
                                _y: 0
                            })
                        }
                    }}
                />
        </VictoryGroup>
        );
    }
}

