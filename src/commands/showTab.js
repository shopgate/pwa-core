/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppCommand from '../classes/AppCommand';
import { logger, hasSGJavaScriptBridge } from '../helpers';

/**
 * Sends a showTab command to the app.
 * @param {params} params The command parameters
 * @param {string} params.targetTab The navigation stack which shall be displayed.
 * @param {string} [params.transition] The type of the transition.
 * @param {number} [params.speedFactor] Speeds up or reduces the transition speed. Number
 *                                      between 0 and 1 speeds up. Number above 1 reduces speed.
 */
export default (params) => {
  if (!hasSGJavaScriptBridge()) {
    logger.warn('WARNING: \'showTab\' can only be called in an app environment!');
    return;
  }

  const command = new AppCommand();

  command
    .setCommandName('showTab')
    .dispatch(params);
};
