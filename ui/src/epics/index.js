import { combineEpics } from 'redux-observable';
import { statusEpic } from './status';
import { graphEpics } from './graph';

export const rootEpic = combineEpics(
  statusEpic,
  graphEpics
);
