export const authTokenName = 'authToken';

/**
 * Gets the site-stored authToken from localStorage and returns it in the form of an authorization header
 */
export function getBearerToken() {
  return localStorage.getItem(authTokenName);
}

/**
 * Sets a returned token in localStorage for attachment to later network requests
 * @param {*} token - A valid JWT authentication token
 */
export function setBearerToken(token) {
  localStorage.setItem(authTokenName, token);
}
