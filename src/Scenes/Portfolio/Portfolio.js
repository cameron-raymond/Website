import React, { Component } from 'react';
import './Portfolio.css';



export default class Portfolio extends Component {
  constructor(props) {
    super(props)
  }


  render() {

    return (
      <div id="container">
        
          <p>test</p>
      </div>

    );
  }
}

// class Trailing extends React.Component {
//   state = {
//     coords: [0, 0],
//     info: this.props.info
//   }
//   handleMouseMove = ({ pageX, pageY }) => this.setState({ coords: [pageX, pageY] })

//   transform = (x, y) => `translate3d(${x - 35}px, ${y - 35}px, 0)`
//   componentDidMount = () => window.addEventListener('mousemove', this.handleMouseMove)
//   render() {
//     return (
//       <Trail native items={[this.state.info]} to={this.state}>
//         {(item) => props => (
//           <animated.div
//             style={{
//               width: '50%', backgroundColor: '#D8C3A5', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 10, zIndex: 999,
//               transform: props.coords.interpolate(this.transform)
//             }}>
//             {item}
//           </animated.div>
//         )}
//       </Trail>

//     )
//   }
// }
