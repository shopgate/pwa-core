/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import event from '../../classes/Event';

import openScanner from '../../commands/scanner/openScanner';
import closeScanner from '../../commands/scanner/closeScanner';
import startScanner from '../../commands/scanner/startScanner';
import stopScanner from '../../commands/scanner/stopScanner';
import registerEvents from '../../commands/registerEvents';
import broadcastEvent from '../../commands/broadcastEvent';

const APP_EVENT_SCANNER_DID_SCAN = 'scannerDidScan';
const APP_EVENT_CLOSE_SCANNER = 'closeScanner';
const APP_EVENT_DISPLAY_SCANNER_ERROR = 'displayScannerError';

registerEvents([
  APP_EVENT_SCANNER_DID_SCAN,
  APP_EVENT_CLOSE_SCANNER,
]);

/**
 * The payload of a "scannerDidScan" app event.
 * @typedef {Object} ScannerDidScanPayload
 * @property {string} format The format of the scanned content. Possible values are: UPC_E, CODE_39,
 *   EAN_13, EAN_8, CODE_93, CODE_128 PDF_417, QR_CODE, AZTEC, ITF and DATA_MATRIX.
 * @property {string} code The code that has been scanned.
 */

/**
 * A callback that is invoked whenever the scanner recognized supported content.
 * @callback scanCallback
 * @param {ScannerDidScanPayload} data The event payload.
 */

/**
 * The ScannerManager class. It's supposed to simplify the processes that are necessary to
 * interact with the scanner feature of the app. It provides the possiblity to register a callback
 * to handle the scanned barcode / qr code payload.
 */
class ScannerManager {
  /**
   * The ScannerManager constructor.
   * @param {Object} options Options for the ScannerManager.
   * @param {boolean} [options.autoClose=true] If set to TRUE, the app scanner will close.
   * @param {string} [options.errorPopupTitle=""] An optional custom title for the error popup.
   * automatically after a successful scan.
   */
  constructor(options = {}) {
    this.autoClose = options.autoClose || true;
    this.errorPopupTitle = options.errorPopupTitle || 'Fehler';

    this.scanCallback = () => {};

    /**
     * Create references to the app event handler fuctions. They preserve the "this" context of
     * a ScannerManager instance and can be used to register and unregister event listeners.
     */
    this.scannerDidScanHandlerRef = this.scannerDidScanHandler.bind(this);
    this.closeScannerHandlerRef = this.closeScanner.bind(this);
  }

  /**
   * The internal handler for the "scannerDidScan" app event.
   * @private
   * @param {ScannerDidScanPayload} payload The event payload.
   */
  scannerDidScanHandler(payload) {
    /**
     * Wrapper function to enable execution of async code within an EventEmitter callback.
     */
    const execScanCallback = async () => {
      try {
        // Invoke the callback.
        await this.scanCallback(payload);
        startScanner();

        if (this.autoClose) {
          // Close the scanner after a successful scan.
          this.closeScanner();
        }
      } catch (error) {
        const { message } = error;

        startScanner();

        // Trigger an error message within the app scanner webview. When content processing failed.
        broadcastEvent({
          event: APP_EVENT_DISPLAY_SCANNER_ERROR,
          parameters: [{
            title: this.errorPopupTitle,
            message,
          }],
        });
      }
    };

    // Stop the scanner so that no furtner image recognotion happens while the payload is processed.
    stopScanner();
    execScanCallback();
  }

  /**
   * Register a callback function that is invoked whenever the scanner recognized supported content.
   * @param {scanCallback} callback The callback - async functions are supported.
   * @return {ScannerManager}
   */
  registerScanCallback(callback) {
    if (typeof callback === 'function') {
      this.scanCallback = callback;
    }

    return this;
  }

  /**
   * Open the scanner webview. It will instantly start the scanning process.
   * @return {ScannerManager}
   */
  openScanner() {
    // Add a listener to the closeScanner event to react on a close button press in the scanner.
    event.addListener(APP_EVENT_CLOSE_SCANNER, this.closeScannerHandlerRef);
    // Add a listener to the scannerDidScan event to process scanner data.
    event.addListener(APP_EVENT_SCANNER_DID_SCAN, this.scannerDidScanHandlerRef);
    // Open the scanner webview.
    openScanner();
    return this;
  }

  /**
   * Close the scanner webview.
   * @return {ScannerManager}
   */
  closeScanner() {
    // Remove the listeners to avoid further execution by other instances.
    event.removeListener(APP_EVENT_CLOSE_SCANNER, this.closeScannerHandlerRef);
    event.removeListener(APP_EVENT_SCANNER_DID_SCAN, this.scannerDidScanHandlerRef);
    // Close the scanner webview.
    closeScanner();
    return this;
  }
}

export default ScannerManager;
