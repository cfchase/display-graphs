import * as React from 'react';
import { connect } from "react-redux";
import Plot from 'react-plotly.js';
import Vega from 'react-vega';
import { getGraph } from "../actions/graph";

class Graph extends React.Component {
  componentDidMount() {
    this.props.init();
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
      <div>
        <div>
          <h1>{title}</h1>

          <button
            id="updateGraphButton"
            type="button"
            onClick={e => {
              this.props.click(e);
            }}
          >
            Update Graph
          </button>
        </div>

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
