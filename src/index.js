import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto'
import Home from './scenes/Home/Home'
import registerServiceWorker from './registerServiceWorker';
// heck yeah
ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
 