import * as React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import io from 'socket.io-client'

import { queryGraphs } from '../actions/graph';
import Graph from './Graph'

import './Graph.css';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.init();
    this.socket = io.connect("/notifications");
    console.log("Connecting Socket as component mounts");

    this.socket.on('update',(res)=>{
      this.props.init();
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
    console.log("Disconnecting Socket as component will unmount")
  }

  render() {
    let graphList = <p>No graphs</p>;
    if (this.props.layoutLoading) {
      graphList = <p>Loading...</p>;
    } else if (this.props.error) {
      graphList = <p>Error: {JSON.stringify(this.props.error)}</p>
    } else if (this.props.graphs) {
      graphList = lodash.map(this.props.graphs, graph =>  <Graph key={graph.id} graph={graph}/>);
    }

    return (
      <div className="Dashboard">
        {graphList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.dashboardReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch(queryGraphs());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
