/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

 /**
 * The Device class.
 */
class Device {
  /**
   * The constructor.
   */
  constructor() {
    this.ua = navigator.userAgent;

    this.android = this.ua.match(/(Android);?[\s/]+([\d.]+)?/);
    this.ipad = this.ua.match(/(iPad).*OS\s([\d_]+)/);
    this.iphone = !this.ipad && this.ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  }

  /**
   * Returns true if this is an iOS device.
   * @returns {boolean}
   */
  isIos() {
    return !!(this.ipad || this.iphone || this.ipod);
  }

  /**
   * Returns true if this is an iphone.
   * @returns {boolean}
   */
  isIphone() {
    return !!this.iphone;
  }

  /**
   * Returns true if this is an iPad.
   * @returns {boolean}
   */
  isIpad() {
    return !!this.ipad;
  }

  /**
   * Returns true if this is an Android device.
   * @returns {boolean}
   */
  isAndroid() {
    return !!this.android;
  }
}

export default new Device();
