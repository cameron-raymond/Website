import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Components/header/Header'
import Intro from './Scenes/Intro/Intro';
import './index.css'



class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <Header />
        </div>
        <div className="footer">
            <Intro />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
