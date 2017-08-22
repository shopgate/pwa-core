/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This transformer uses babel to transform our es6 code
 * to code that is supported in node for testing.
 * This is required because the original 'babel-jest' has issues with caching
 * of files with same name and same content.
 */

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
const crypto = require('crypto');

module.exports = {
  /**
   * Processes the file content using babel and returns the transformed code.
   * @param {string} src Source of the file.
   * @param {string} filename Path to the file
   * @returns {string}
   */
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [jestPreset],
        retainLines: true,
      }).code;
    }
    return src;
  },

  /**
   * Generates a cache key that will be used to the store the transformed code into the cache.
   * @param {string} fileData Content of the file.
   * @param {string} fileName Path to the file.
   * @param {string} configString Configuration as a string.
   * @returns {*}
   */
  getCacheKey(fileData, fileName, configString) {
    return crypto.createHash('md5')
      .update(fileName)
      .update(fileData)
      .update(configString)
      .digest('hex');
  },
};
