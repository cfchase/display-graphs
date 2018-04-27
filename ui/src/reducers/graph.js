import {
  TYPE_GET_GRAPH,
  TYPE_GET_GRAPH_SUCCEEDED,
  TYPE_GET_GRAPH_FAILED
} from "../actions/graph";

const initialState = {
  graphs: [],
  graphType: null,
  graph: null,
  graphLoading: false,
  error: null
};

export const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_GET_GRAPH:
      return {
        ...state,
        graphLoading: true
      };
    case TYPE_GET_GRAPH_SUCCEEDED:
      return {
        ...state,
        graphType:  action.payload.graph.type,
        graph: action.payload.graph.graph,
        graphLoading: false,
        error: null
      };
    case TYPE_GET_GRAPH_FAILED:
      console.error(action.payload.error);
      return {
        ...state,
        graphType: null,
        graph: null,
        graphLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
