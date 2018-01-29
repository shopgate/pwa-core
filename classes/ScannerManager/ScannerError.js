/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The ScannerError is supposed to be thrown in case of a processing error of the scanned content.
 * @extends Error
 */
class ScannerError extends Error {
  /**
   * Constructor for the ScannerError
   * @param {string} message The message of the error
   * @param {string} [title=null] The title of the error
   */
  constructor(message, title = null) {
    super(message);

    this.title = title;
  }
}

export default ScannerError;
