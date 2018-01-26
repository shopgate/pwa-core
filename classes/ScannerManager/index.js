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
 * @callback scanHandlerCallback
 * @param {ScannerDidScanPayload} data The event payload.
 */

/**
 * The ScannerManager class. It's intendend to simplify the processes that are necessary to
 * programmatically interact with the scanner feature of the app. It provides the possiblity to
 * register a handler callback to process the scanned barcode / qr code payload.
 */
class ScannerManager {
  /**
   * The ScannerManager constructor.
   * @param {Object} options Options for the ScannerManager.
   * @param {boolean} [options.autoClose=true] If set to TRUE, the app scanner will close
   *  automatically after a successful scan.
   * @param {string} [options.notificationTitle=""] An optional custom title for the error
   *   notification that is shown to the user in case of an error.
   */
  constructor(options = {}) {
    this.autoClose = options.autoClose || true;
    this.notificationTitle = options.notificationTitle || null;

    this.scanHandlerCallback = () => {};

    /**
     * Create references to the app event handler fuctions. They preserve the "this" context of
     * a ScannerManager instance and can be used to register and unregister event listeners.
     */
    this.scannerDidScanCallback = this.scannerDidScanCallback.bind(this);
    this.closeScanner = this.closeScanner.bind(this);
  }

  /**
   * The internal handler for the "scannerDidScan" app event.
   * @private
   * @param {ScannerDidScanPayload} payload The event payload.
   */
  scannerDidScanCallback(payload) {
    /**
     * Wrapper function to enable execution of async code within an EventEmitter callback.
     */
    const execScanCallback = async () => {
      try {
        // Invoke the callback.
        await this.scanHandlerCallback(payload);
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
            title: this.notificationTitle,
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
   * Register a callback to handle scanned content. Errors that are thrown inside will be displayed
   * to the user as a notification, so that the webview can stay open for further scan attempts.
   * @param {scanHandlerCallback} callback The callback - async functions are supported.
   * @return {ScannerManager}
   */
  registerScanHandler(callback) {
    if (typeof callback === 'function') {
      this.scanHandlerCallback = callback;
    }

    return this;
  }

  /**
   * Open the scanner webview. It will instantly start the scanning process.
   * @return {ScannerManager}
   */
  openScanner() {
    // Add a listener to the closeScanner event to react on a close button press in the scanner.
    event.addListener(APP_EVENT_CLOSE_SCANNER, this.closeScanner);
    // Add a listener to the scannerDidScan event to process scanner data.
    event.addListener(APP_EVENT_SCANNER_DID_SCAN, this.scannerDidScanCallback);
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
    event.removeListener(APP_EVENT_CLOSE_SCANNER, this.closeScanner);
    event.removeListener(APP_EVENT_SCANNER_DID_SCAN, this.scannerDidScanCallback);
    // Close the scanner webview.
    closeScanner();
    return this;
  }
}

export default ScannerManager;
