import * as React from 'react';
import Plot from 'react-plotly.js';
import { getGraph } from "../actions/graph";
import { connect } from "react-redux";

class PlotlyGraph extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {

    let graph = <p>No graph</p>;
    if (this.props.graphLoading) {
      graph = <p>Loading...</p>;
    } else if (this.props.error) {
      graph = <p>Error: {JSON.stringify(this.props.error)}</p>
    } else if (this.props.graph) {
      graph = (
        <Plot
          data={this.props.graph.data}
          layout={this.props.graph.layout}
        />
      )
    }


    return (
      <div>
        <div>
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


export default connect(mapStateToProps, mapDispatchToProps)(PlotlyGraph);
