# Shopgate's PWA core library 
![](https://travis-ci.org/shopgate/pwa-core.svg?branch=master)

This is the core library from Shopgate that handled pipeline requests, app commands and provides the basic app template.

## Installation

Using npm:

```sh
npm i shopgate/pwa-core
```

## What is inside?

### Classes

  * [AppCommand](./classes/AppCommand)
  * [DataRequest](./classes/DataRequest)
  * [Event](./classes/Event)
  * [Logger](./classes/Logger)
  * [PipelineManagers](./classes/PipelineManagers)
  * [PipelineRequest](./classes/PipelineRequest)
  * [Request](./classes/Request)
  * [RequestBuffer](./classes/RequestBuffer)
  * [RequestManager](./classes/RequestManager)
  * [WebStorageRequest](./classes/WebStorageRequest)

### Commands

  * [broadcastEvent](./commands/README.md#broadcastevent)
  * [flushTab](./commands/README.md#flushtab)
  * [hideMenuBar](./commands/README.md#hidemenubar)
  * [hideNavigationBar](./commands/README.md#hidenavigationbar)
  * [onload](./commands/README.md#onload)
  * [openCart](./commands/README.md#opencart)
  * [openPage](./commands/README.md#openpage)
  * [openSearch](./commands/README.md#opensearch)
  * [popTabToRoot](./commands/README.md#poptabtoroot)
  * [registerEvents](./commands/README.md#registerevents)
  * [setDebugLoggingEnabled](./commands/README.md#setdebugLoggingenabled)
  * [showNavigationBar](./commands/README.md#shownavigationbar)
  * [showTab](./commands/README.md#showtab)
  * [unifiedTracking](./commands/README.md#unifiedtracking)
  * [webStorage](./commands/README.md#webstorage)

### Helpers

  * [ajaxUrl](./helpers/README.md#ajaxurl)
  * [hasSGJavaScriptBridge](./helpers/README.md#hassgjavascriptbridge)
