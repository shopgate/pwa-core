/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppCommand from '../../classes/AppCommand';
import {
  SCANNER_ANIMATION_FOREGROUND_BOTTON,
} from '../../constants/Command';

/**
 * Sends a closeScanner command to the app.
 * @param {Object} params The command parameters.
 * @param {string} [params.animation] The exit animation for the webview.
 */
export default (params) => {
  const defaults = {
    animation: SCANNER_ANIMATION_FOREGROUND_BOTTON,
  };

  const merged = {
    ...defaults,
    ...params,
  };

  const command = new AppCommand();
  command
    .setCommandName('closeScanner')
    .dispatch(merged);
};
