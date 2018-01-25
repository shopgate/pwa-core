/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppCommand from '../../classes/AppCommand';
import {
  PWA_DEFAULT_TAB,
  SCANNER_ANIMATION_FOREGROUND_BOTTON,
  SCANNER_MODE_ON,
  SCANNER_MODE_OFF,
} from '../../constants/Command';

/**
 * Data definition the scanner modes parameters. Possible values are "on" or "off".
 * @typedef {Object} ScannerModes
 * @property {string} barcodeRecognition Shall the scanner try to recognize barcodes.
 * @property {string} imageCapturing Shall the scanner try to capture images.
 * @property {string} cardRecognition Shall the scanner try to recognize credit cards.
 */

/**
 * Sends an openScanner command to the app.
 * @param {Object} params The command parameters.
 * @param {string} params.src The URL to the webview which overlays the scanner feed.
 * @param {Object} [params.eventParams] If set the given data will be send as an
 *   "updateTemplateContent" SGEvent to the scanner webview.
 * @param {string} [params.animation] The entry animation for the webview.
 * @param {ScannerModes} params.modes The scanner modes.
 */
export default (params) => {
  const defaults = {
    src: 'sgapi:scanner',
    animation: SCANNER_ANIMATION_FOREGROUND_BOTTON,
    modes: {
      barcodeRecognition: SCANNER_MODE_ON,
      imageCapturing: SCANNER_MODE_OFF,
      cardRecognition: SCANNER_MODE_OFF,
    },
  };

  let merged = {
    ...defaults,
    ...params,
  };

  const { barcodeRecognition, imageCapturing, cardRecognition } = merged;

  // Add some internal data for the scanner webview.
  const eventParams = {
    scannerData: {
      modes: {
        barcodeRecognition: barcodeRecognition === SCANNER_MODE_ON,
        imageCapturing: imageCapturing === SCANNER_MODE_ON,
        cardRecognition: cardRecognition === SCANNER_MODE_ON,
      },
    },
    sourceTab: PWA_DEFAULT_TAB,
  };

  merged = {
    ...merged,
    eventParams: {
      ...merged.eventParams,
      ...eventParams,
    },
  };

  const command = new AppCommand();
  command
    .setCommandName('openScanner')
    .dispatch(merged);
};
