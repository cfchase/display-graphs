export const TYPE_GET_GRAPH = 'GET_GRAPH';
export const getGraph = (id) => ({
  type: TYPE_GET_GRAPH,
  payload: {id}
});

export const TYPE_GET_GRAPH_SUCCEEDED = 'GET_GRAPH_SUCCEEDED';
export const getGraphSucceeded = (graph) => ({
  type: TYPE_GET_GRAPH_SUCCEEDED,
  payload: {graph}
});

export const TYPE_GET_GRAPH_FAILED = 'GET_GRAPH_FAILED';
export const getGraphFailed = (error) => ({
  type: TYPE_GET_GRAPH_FAILED,
  payload: {error}
});

export const TYPE_QUERY_GRAPHS = 'QUERY_GRAPHS';
export const queryGraphs = (params) => ({
  type: TYPE_QUERY_GRAPHS,
  payload: {params}
});

export const TYPE_QUERY_GRAPHS_SUCCEEDED = 'QUERY_GRAPHS_SUCCEEDED';
export const queryGraphsSucceeded = (graphs) => ({
  type: TYPE_QUERY_GRAPHS_SUCCEEDED,
  payload: {graphs}
});

export const TYPE_QUERY_GRAPHS_FAILED = 'QUERY_GRAPHS_FAILED';
export const queryGraphsFailed = (error) => ({
  type: TYPE_QUERY_GRAPHS_FAILED,
  payload: {error}
});
