/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppCommand from '../../classes/AppCommand';

/**
 * Sends a stopScanner command to the app.
 * It deactivates the content recognition of the scanner.
 */
export default () => {
  const command = new AppCommand();
  command
    .setCommandName('stopScanner')
    .dispatch();
};
