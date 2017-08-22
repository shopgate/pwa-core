/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

global.SGEvent = {
  __call: () => {},
};

/* global jasmine */
if (jasmine) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
}
