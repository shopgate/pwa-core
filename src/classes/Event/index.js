/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventEmitter from 'events';
import { logger } from '../../helpers';

const HANDLER_ADD = 'add';
const HANDLER_REMOVE = 'remove';

/**
 * Event class.
 */
class Event extends EventEmitter {
  /**
   * Constructor.
   */
  constructor() {
    super();

    /**
     * A global implementation of the call function
     * to make it accessible to the app.
     * eslint-disable-next-line
     */
    // eslint-disable-next-line no-underscore-dangle
    window.SGEvent.__call = this.call.bind(this);
  }

  /**
   * Registers a callback function for one or multiple events.
   * @param {string} events A single event or multiple events separated by comma.
   * @param {Function} callback The callback function.
   */
  addCallback(events, callback) {
    this.handleCallbacks(HANDLER_ADD, events, callback);
  }

  /**
   * De-registers a callback function for one or multiple events.
   * @param {string} events A single event or multiple events separated by comma.
   * @param {Function} callback The callback function.
   */
  removeCallback(events, callback) {
    this.handleCallbacks(HANDLER_REMOVE, events, callback);
  }

  /**
   * Handles the register and de-register of a callback.
   * @param {string} type What type of action should be performed.
   * @param {string} events A single event or multiple events separated by comma.
   * @param {Function} callback The callback function.
   */
  handleCallbacks(type, events, callback) {
    const eventNames = events.split(',');

    eventNames.forEach((event) => {
      switch (type) {
        case HANDLER_ADD:
          this.addListener(event, callback);
          break;
        case HANDLER_REMOVE:
          this.removeListener(event, callback);
          break;
        default:
          break;
      }
    });
  }

  /**
   * Triggers an event.
   * @param {string} event The event name.
   */
  trigger(event) {
    setTimeout(() => this.emit(event), 0);
  }

  /**
   * This function will be called by the app to trigger events.
   * @param {string} event The event name.
   * @param {Array} [parameters=[]] The event parameters.
   */
  call(event, parameters = []) {
    let eventName = event;

    /**
     * Some system events relate to request commands.
     * When these commands were fired, a serial was created in order
     * to identify an appropriate callback event.
     * To identify these callbacks, the serial has to be decoded from the parameter list.
     */
    if (event === 'pipelineResponse') {
      eventName += `:${parameters[1]}`;
    } else if (event === 'dataResponse' || event === 'webStorageResponse') {
      eventName += `:${parameters[0]}`;
    }

    const calledEvent = this.emit(eventName, ...parameters);

    if (!calledEvent) {
      logger.warn(`Attempt to call unknown event: ${eventName}`);
    }
  }
}

export default new Event();
