import { Observable } from 'rxjs';
import {
  TYPE_GET_STATUS,
  getStatusSucceeded,
  getStatusFailed
} from '../actions/status';

export function statusEpic(action$) {
  return action$.ofType(TYPE_GET_STATUS).switchMap(action$ =>
    Observable.ajax
      .getJSON('/api/v1/status')
      .map(post => getStatusSucceeded(post))
      .catch(error => Observable.of(getStatusFailed(error)))
  );
}
