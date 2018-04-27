export function paramsToQueryString(params) {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  return '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
}