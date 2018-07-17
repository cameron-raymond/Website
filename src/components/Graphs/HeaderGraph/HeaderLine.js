import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryLine, VictoryGroup, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryChart, VictoryTheme } from 'victory';

export default class PieChart extends Component {
  render() {
    return (
      <div>
        <VictoryGroup
          animate={{ duration: 100 }}
          data={data} labels={lifeLabels}
          containerComponent={<VictoryVoronoiContainer />} >
          <VictoryLine horizontal labels={(datum) => "test"} />
          <VictoryScatter labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />} />
        </VictoryGroup>
      </div>
    );
  }
}

const lifeLabels = ["Born", "Move to United States",
  "Younger Brother is Born",
  "9/11", "Move Back to Canada",
  "Start Highschool",
  "Take my First Software Class",
  "Start University -  Queen's Political Studies, Minor in Computer Science",
  "Start work at Cormex Research",
  "Transfer to Queen's Computer Science, Minor in Political Studies"
]
const data = [
  { x: new Date(1998, 6, 30), y: 100 },
  { x: new Date(1998, 9, 12), y: -100 },
  { x: new Date(2001, 5, 26), y: 100 },
  { x: new Date(2001, 9, 11), y: -100 },
  { x: new Date(2001, 11, 23), y: 100 },
  { x: new Date(2012, 9, 12), y: -100 },
  { x: new Date(2014, 9, 12), y: 100 },
  { x: new Date(2016, 9, 6), y: -100 },
  { x: new Date(2016, 5, 23), y: 100 },
  { x: new Date(2017, 7, 23), y: -100 },

]