import { Observable } from 'rxjs';
import {
  TYPE_CONNECT_NOTIFICATIONS,
  TYPE_DISCONNECT_NOTIFICATIONS,
  TYPE_RECEIVE_NOTIFICATION
} from '../actions/notifications';


const socket$ = Observable.webSocket(
  "ws://localhost:5000/test"
  // "ws://echo.websocket.org"
);

export function notificationsEpic(action$) {
  return action$.ofType(TYPE_CONNECT_NOTIFICATIONS)
    .mergeMap(action =>
      socket$
        .map(payload => ({
          type: TYPE_RECEIVE_NOTIFICATION,
          payload
        }))
        .takeUntil(
          action$.ofType(TYPE_DISCONNECT_NOTIFICATIONS)
        )
    );
}
