import React from 'react'
import { Spring } from 'react-spring'

const DOWN_CHEV = 'M386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 Z'
const UP_CHEV = 'M203.718,91.567 0,294.621 21.179,315.869 203.718,133.924 386.258,315.869 407.436,294.621 Z'

const styles = {
  container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background' },
  shape: { width: 200, height: 200, willChange: 'transform' }
}

const Content = ({ toggle, color, scale, shape, start, end, stop, rotation }) => (
  <div style={{ ...styles.container, background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>
    <svg
      style={{ ...styles.shape, transform: `scale3d(${scale}, ${scale}, ${scale}) rotate(${rotation})` }}
      version="1.1"
      viewBox="0 0 400 400">
      <g style={{ cursor: 'pointer' }} fill={color} fillRule="evenodd" onClick={toggle}>
        <path id="path-1" d={shape} />
      </g>
    </svg>
  </div>
)

export default class Chevron extends React.Component {
  state = { toggle: true }
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  render() {
    const toggle = this.state.toggle
    return (
      <Spring
        from={{ color: 'black' }}
        to={{
          color:'#E85A4f',
          shape: toggle ? DOWN_CHEV : UP_CHEV,
          rotation: toggle ? '0deg' : '90deg'
        }}
        toggle={this.toggle} // Additional props will be spread over the child
        children={Content} // Render prop
      />
    )
  }
}