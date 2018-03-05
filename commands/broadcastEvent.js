/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppCommand from '../classes/AppCommand';

/**
 * Sends a broadcastEvent command to the app.
 * @param {Object} params The command parameters.
 * @param {string} [params.mode] The flashlight mode.
 */
export default (params) => {
  const defaults = {
    event: '',
    parameters: [],
  };

  const merged = {
    ...defaults,
    ...params,
  };

  const command = new AppCommand();
  command
    .setCommandName('broadcastEvent')
    .dispatch(merged);
};
