import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { VerticalNav } from 'patternfly-react';

import { Routes } from './Routes'

import '../node_modules/patternfly/dist/css/patternfly.css';
import '../node_modules/patternfly/dist/css/patternfly-additions.css';
import '../node_modules/patternfly-react/dist/css/patternfly-react.css';
import './App.css';

class App extends Component {
  handleNavClick = navItem => {
    switch (navItem.title) {
      case 'Home':
        this.props.history.push('/');
        break;
      case 'Route 2':
        this.props.history.push('/route2');
        break;
      case 'Route 3':
        this.props.history.push('/route3');
        break;
      default:
        console.log('Unrecognized navbar item clicked');
    }
  };


  render() {
    return (
      <div className="App">
        <VerticalNav>
          <VerticalNav.Masthead title="Demo App" />
          <VerticalNav.Item
            title="Home"
            iconClass="fa fa-dashboard"
            onClick={this.handleNavClick}
            className={null}
          />
          <VerticalNav.Item
            title="Route 2"
            iconClass="fa fa-star"
            onClick={this.handleNavClick}
            className={null}
          />
        </VerticalNav>
        <Routes/>
      </div>
    );
  }
}

export default withRouter(App);
