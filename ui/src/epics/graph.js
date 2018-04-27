import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { paramsToQueryString} from './utils';
import {
  TYPE_GET_GRAPH,
  getGraphSucceeded,
  getGraphFailed,
  TYPE_QUERY_GRAPHS,
  queryGraphsSucceeded,
  queryGraphsFailed,
} from '../actions/graph';

function getGraphEpic(action$) {
  return action$.ofType(TYPE_GET_GRAPH).switchMap(action$ =>
    Observable.ajax
      .getJSON(`/api/v1/graphs/${action$.payload.id}`)
      .map(graph => getGraphSucceeded(graph))
      .catch(error => Observable.of(getGraphFailed(error)))
  );
}

function queryGraphsEpic(action$) {
  return action$.ofType(TYPE_QUERY_GRAPHS).switchMap(action$ =>
    Observable.ajax
      .getJSON(`/api/v1/graphs${paramsToQueryString(action$.payload.params)}`)
      .map(graphs => queryGraphsSucceeded(graphs))
      .catch(error => Observable.of(queryGraphsFailed(error)))
  );
}

export const graphEpics = combineEpics(
  getGraphEpic,
  queryGraphsEpic
);
