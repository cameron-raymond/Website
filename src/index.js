import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Components/header/Header'
import Intro from './Scenes/Intro/Intro';
import './index.css'
import agent_file from './CRaymondResume2019.pdf';




class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <Header />
          <div className="info"> 
            <p>(647) 984-3006</p>
            <a href="mailto:15cjkr@queensu.ca" style={{ textDecoration: "none" }}><p >15cjkr@queensu.ca</p></a>
            <a href={agent_file} download="CameronRaymondResume.pdf" style={{ textDecoration: "none" }}>resumé</a>
        </div>
        </div>
        
        <div className="footer">
            <Intro />
        </div>
        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
