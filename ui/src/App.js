import React, { Component } from 'react';

import { Routes } from './Routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <main className="main-content">
          <Routes/>
        </main>
      </div>
    );
  }
}

export default App;
