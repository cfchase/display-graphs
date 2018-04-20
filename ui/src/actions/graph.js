export const TYPE_GET_GRAPH = 'GET_GRAPH';
export const getGraph = () => ({
  type: TYPE_GET_GRAPH,
  payload: {}
});

export const TYPE_GET_GRAPH_SUCCEEDED = 'GET_GRAPH_SUCCEEDED';
export const getGraphSucceeded = (graph) => ({
  type: TYPE_GET_GRAPH_SUCCEEDED,
  payload: {
    graph
  }
});

export const TYPE_GET_GRAPH_FAILED = 'GET_GRAPH_FAILED';
export const getGraphFailed = (error) => ({
  type: TYPE_GET_GRAPH_FAILED,
  payload: {
    error
  }
});