import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/header/Header'
import Intro from './Scenes/Intro/Intro';
import './index.css'
import * as serviceWorker from './serviceWorker';


class App extends React.Component {
    render() {
      return (
        <div>
                <Header />
                <Intro/>
        </div>
      );
    }
  }
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
