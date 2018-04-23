import * as React from 'react';
import { connect } from "react-redux";
import io from "socket.io-client"
import Plot from 'react-plotly.js';
import Vega from 'react-vega';

import { getGraph } from "../actions/graph";

import './Graph.css';

class Graph extends React.Component {
  componentDidMount() {
    this.props.init();
    this.socket = io.connect("/notifications");
    console.log("Connecting Socket as component mounts");

    this.socket.on('update',(res)=>{
      console.dir(res);
      this.props.init();
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
    console.log("Disconnecting Socket as component will unmount")
  }

  render() {
    let graph = <p>No graph</p>;
    let title = null;
    if (this.props.graphLoading) {
      graph = <p>Loading...</p>;
    } else if (this.props.error) {
      graph = <p>Error: {JSON.stringify(this.props.error)}</p>
    } else if (this.props.graph && this.props.graphType === "plotly") {
      title = "Plotly Graph";
      graph = (
        <Plot
          data={this.props.graph.data}
          layout={this.props.graph.layout}
        />
      )
    } else if (this.props.graph && this.props.graphType === "vega") {
      title = "Vega Graph";
      graph = <Vega spec={this.props.graph} />;
    }


    return (
      <div className="Graph">
        <h1>{title}</h1>
        {graph}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.graphReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch(getGraph());
    },
    click: (e) => {
      e.preventDefault();
      dispatch(getGraph());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);
