import { combineEpics } from 'redux-observable';
import { statusEpic } from './status';
import { graphEpic } from './graph';

export const rootEpic = combineEpics(
  statusEpic,
  graphEpic
);
