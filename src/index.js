import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/header/Header'
import Intro from './Scenes/Intro/Intro';
import Move from './Components/button/Button'
import './index.css'
import * as serviceWorker from './serviceWorker';


class App extends React.Component {
  render() {
    return (
      <div >
        <Header />
        <Intro />
        <div className="moveButton">
          <Move />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
