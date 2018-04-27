import * as React from 'react';
import Plot from 'react-plotly.js';
import Vega from 'react-vega';

import './Graph.css';

const Graph = (props) => {
  console.log(props);
  let plot = <p>No graph</p>;
  let title = null;
  if (props.graph && props.graph.type === "plotly") {
    title = props.graph.label;
    plot = (
      <Plot
        data={props.graph.graph.data}
        layout={props.graph.graph.layout}
      />
    )
  } else if (props.graph && props.graph.type === "vega") {
    title = props.graph.label;
    plot = <Vega spec={props.graph.graph}/>;
  }


  return (
    <div className="Graph">
      <h1>{title}</h1>
      {plot}
    </div>
  );
};

export default Graph;
