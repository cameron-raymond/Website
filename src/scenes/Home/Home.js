import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import * as ScrollMagic from 'scrollmagic'
import WhatIDo from './WhatIDo'
import Project from './Projects'

import About from './About'
import More from './More'
import './Home.css';


class Home extends Component {


  render() {

    return (
      <div >
        <div id="navbar">
          <Header />
        </div>
        <div className="Container">
          
          <About />
          <WhatIDo />
          <Project/>
          <More />

        </div>
      </div >
    );
  }
}

export default Home;
