export const TYPE_CONNECT_NOTIFICATIONS = 'CONNECT_NOTIFICATIONS';
export const connectNotifications = () => ({
  type: TYPE_CONNECT_NOTIFICATIONS,
  payload: {}
});

export const TYPE_DISCONNECT_NOTIFICATIONS = 'DISCONNECT_NOTIFICATIONS';
export const disconnectNotifications = () => ({
  type: TYPE_DISCONNECT_NOTIFICATIONS,
  payload: {}
});

export const TYPE_RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION';
export const receiveNotification = (notification) => ({
  type: TYPE_RECEIVE_NOTIFICATION,
  payload: {
    notification
  }
});

