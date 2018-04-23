import {
  TYPE_CONNECT_NOTIFICATIONS,
  TYPE_DISCONNECT_NOTIFICATIONS,
  TYPE_RECEIVE_NOTIFICATION
} from "../actions/notifications";

const initialState = {
  lastMessage: null
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_CONNECT_NOTIFICATIONS:
      console.log('TYPE_CONNECT_NOTIFICATIONS');
      return {};
    case 'TICKER_TICK':
      console.log('TICKER_TICK');
      return {};
    case 'CLOSE_TICKER_STREAM':
      console.log('CLOSE_TICKER_STREAM');
      return {};
    default:
      return state;
  }
};

