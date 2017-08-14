/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns a URL for performing XHR Requests.
 * @param {string} action The action to request on the server.
 * @return {string} The full URL.
 */
export const ajaxUrl = action => (action ? `sgapi:${action}` : '');

/**
 * Checks if the hasSGJavascriptBridge exists.
 * @return {boolean}
 */
export function hasSGJavaScriptBridge() {
  return (typeof SGJavascriptBridge !== 'undefined');
}
