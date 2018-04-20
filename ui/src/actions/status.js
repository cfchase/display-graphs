export const TYPE_GET_STATUS = 'GET_STATUS';
export const getStatus = () => ({
  type: TYPE_GET_STATUS,
  payload: {}
});

export const TYPE_GET_STATUS_SUCCEEDED = 'GET_STATUS_SUCCEEDED';
export const getStatusSucceeded = (status) => ({
  type: TYPE_GET_STATUS_SUCCEEDED,
  payload: {
    status
  }
});

export const TYPE_GET_STATUS_FAILED = 'GET_STATUS_FAILED';
export const getStatusFailed = (error) => ({
  type: TYPE_GET_STATUS_FAILED,
  payload: {
    error
  }
});