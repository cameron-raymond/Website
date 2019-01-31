import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Components/header/Header'
import Intro from './Scenes/Intro/Intro';
import './index.css'
import ReactGA from 'react-ga';
import agent_file from './CRaymondResume2019.pdf';




class App extends React.Component {
  initializeReactGA() {
    ReactGA.initialize('UA-133541363-1');
    ReactGA.pageview('/homepage');
  }
  componentWillMount() {
    this.initializeReactGA()
  }

  logEvent(logCategory, logAction) {
    console.log(logAction)
    ReactGA.event({
      category: logCategory,
      action: logAction
    });
  }
  render() {
    return (
      <div>
        <div className="header">
          <Header />
          <div className="info">
            <p>(647) 984-3006</p>
            <div onClick={() => this.logEvent('click','Clicked on email address')}>
              <a href="mailto:c.raymond@queensu.ca"><p>c.raymond@queensu.ca</p></a>
            </div>
            <div onClick={() => this.logEvent('click','Downloaded resume')}>
            <a href={agent_file} download="CameronRaymondResume.pdf" >resumé</a>
            </div>

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
