# Shopgate's PWA core library

This is the core library from Shopgate that handled pipeline requests, app commands and provides the basic app template.

## Installation

Using npm:

```sh
npm i shopgate/pwa-core
```

## What is inside?

### Classes

  * [AppCommand](./classes/AppCommand)
  * [DatRequest](./classes/DatRequest)
  * [Device](./classes/Device)
  * [Event](./classes/Event)
  * [Logger](./classes/Logger)
  * [PipelineManagers](./classes/PipelineManagers)
  * [PipelineRequest](./classes/PipelineRequest)
  * [Request](./classes/Request)
  * [RequestBuffer](./classes/RequestBuffer)
  * [RequestManager](./classes/RequestManager)
  * [WebStorageRequest](./classes/WebStorageRequest)

### Commands

  * [broadcastEvent](./commands/README.md#broadcastEvent)
  * [flushTab](./commands/README.md#flushTab)
  * [hideMenuBar](./commands/README.md#hideMenuBar)
  * [hideNavigationBar](./commands/README.md#hideNavigationBar)
  * [onload](./commands/README.md#onload)
  * [openCart](./commands/README.md#openCart)
  * [openPage](./commands/README.md#openPage)
  * [openSearch](./commands/README.md#openSearch)
  * [popTabToRoot](./commands/README.md#popTabToRoot)
  * [registerEvents](./commands/README.md#registerEvents)
  * [setDebugLoggingEnabled](./commands/README.md#setDebugLoggingEnabled)
  * [showNavigationBar](./commands/README.md#showNavigationBar)
  * [showTab](./commands/README.md#showTab)
  * [unifiedTracking](./commands/README.md#unifiedTracking)
  * [webStorage](./commands/README.md#webStorage)

### Helpers

  * [ajaxUrl](./helpers/ajaxUrl)
  * [hasSGJavascriptBridge](./helpers/hasSGJavascriptBridge)