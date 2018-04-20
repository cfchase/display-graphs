import { Observable } from 'rxjs';
import {
  TYPE_GET_GRAPH,
  getGraphSucceeded,
  getGraphFailed
} from '../actions/graph';

export function graphEpic(action$) {
  return action$.ofType(TYPE_GET_GRAPH).switchMap(action$ =>
    Observable.ajax
      .getJSON('/api/v1/graph')
      .map(graph => getGraphSucceeded(graph))
      .catch(error => Observable.of(getGraphFailed(error)))
  );
}
