/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* global SGJavascriptBridge */

import logger from '../Logger';
import event from '../Event';
import { hasSGJavascriptBridge } from '../../helpers';

/**
 * The app command class.
 */
class AppCommand {
  /**
   * @param {boolean} log Whether the command will be logged.
   */
  constructor(log = true) {
    this.log = log;
    this.command = {};
    this.libVersion = '9.0';
  }

  /**
   * Sets the command name.
   * @param {string} name The command name.
   * @returns {AppCommand}
   */
  setCommandName(name) {
    this.command.c = name;
    return this;
  }

  /**
   * Sets the library version of the app.
   * @param {string} libVersion The custom library version.
   * @returns {AppCommand}
   */
  setLibVersion(libVersion) {
    this.libVersion = libVersion;
    return this;
  }

  /**
   * Dispatches the command into the app.
   * @param {Object} [params=null] The command params.
   */
  dispatch(params = null) {
    if (params) {
      this.command.p = params;
    }

    if (hasSGJavascriptBridge()) {
      try {
        if ('dispatchCommandsForVersion' in SGJavascriptBridge) {
          SGJavascriptBridge.dispatchCommandsForVersion([this.command], this.libVersion);
        } else {
          SGJavascriptBridge.dispatchCommandsStringForVersion(
            JSON.stringify([this.command]),
            this.libVersion
          );
        }

        this.logCommand();
      } catch (exception) {
        logger.error(exception);
      }
    } else {
      this.logCommand();

      const devServerCommands = [
        'sendPipelineRequest',
        'sendDataRequest',
        'getWebStorageEntry',
      ];

      // Only commands which represent a request are sent to the dev server.
      if (devServerCommands.indexOf(this.command.c) !== -1) {
        this.sendDevCommand();
      }
    }
  }

  /**
   * Logs the command to the console.
   */
  logCommand() {
    if (!this.log) {
      return;
    }

    const logGroupName = `AppCommand: ${this.command.c}`;

    if (this.command.p) {
      logger.groupCollapsed(logGroupName);
      logger.log('parameters:', this.command.p);
      logger.groupEnd(logGroupName);
    } else {
      logger.log(logGroupName);
    }
  }

  /**
   * Sends the command to the development API.
   * @private
   */
  sendDevCommand() {
    // Append a suffix for special endpoints.
    const suffix = this.command.c === 'getWebStorageEntry' ? 'web_storage' : '';

    const url = `http://${process.env.IP}:${process.env.PORT}/${suffix}`;
    const options = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ cmds: [this.command] }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then((response) => {
        if (response.cmds.length) {
          response.cmds.forEach((command) => {
            const name = command.c;
            const params = command.p;

            let args = [];

            /**
             * The server returns a response command for a request command.
             * If the native app receives such a command, it calls a related event within the
             * webview. Here the response parameters are sorted in the specified order for
             * the different response events.
             */
            if (name === 'pipelineResponse') {
              args = [params.error, params.serial, params.output];
            } else if (name === 'dataResponse') {
              args = [params.serial, params.status, params.body, params.bodyContentType];
            } else if (name === 'webStorageResponse') {
              args = [params.serial, params.age, params.value];
            }

            event.call(name, args);
          });
        }
      })
      .catch(err => err && logger.error(err));
  }
}

export default AppCommand;
