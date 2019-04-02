import React, {Component} from 'react';
import ReactGA from 'react-ga';

export default function reveal(WrappedComponent,pageName) {
  return class Analytics extends Component {
    initializeReactGA() {
        ReactGA.initialize('UA-133541363-1');
        ReactGA.pageview(pageName);
      }
      componentWillMount() {
        this.initializeReactGA()
        }
    
 
   render() {
     return (
       <WrappedComponent
         {...this.props}
         />
       );
     }
   };
}