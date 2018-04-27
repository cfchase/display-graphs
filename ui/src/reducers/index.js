import { combineReducers } from 'redux';
import { graphReducer } from './graph';
import { dashboardReducer } from './dashboard';

const rootReducer = combineReducers({
  graphReducer,
  dashboardReducer
});

export default rootReducer;
