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
      return {};
    case TYPE_DISCONNECT_NOTIFICATIONS:
      return {};
    case TYPE_RECEIVE_NOTIFICATION:
      return {};
    default:
      return state;
  }
};

