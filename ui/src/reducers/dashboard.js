import {
  TYPE_QUERY_GRAPHS,
  TYPE_QUERY_GRAPHS_SUCCEEDED,
  TYPE_QUERY_GRAPHS_FAILED
} from "../actions/graph";

const initialState = {
  layout: {},
  graphs: [],
  layoutLoading: false,
  error: null
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_QUERY_GRAPHS:
      return {
        ...state,
        layoutLoading: true
      };
    case TYPE_QUERY_GRAPHS_SUCCEEDED:
      return {
        ...state,
        graphs: action.payload.graphs,
        layoutLoading: false,
        error: null
      };
    case TYPE_QUERY_GRAPHS_FAILED:
      console.error(action.payload.error);
      return {
        ...state,
        graphs: [],
        layoutLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
