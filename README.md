[![Build Status](https://travis-ci.org/axblueblader/funlog.svg?branch=master)](https://travis-ci.org/axblueblader/funlog)
![node](https://img.shields.io/node/v/funlog)
![npm](https://img.shields.io/npm/dm/funlog)

# Funlog

A customizable function-focused Nodejs log wrapper: Log functions input, output and everything in between.

## Motivation

I wrote some handler functions for API routes and wanted to automatically log out inputs and outputs of all functions inside an object. The same need arised when trying to debug an application, so I decided to write this for daily usage, but also for functional programming practice and for fun as well - hence the name `funlog`.

## Quick start

Check out the [basic usage][basic-usage] and other examples in the [examples folder][example].
All examples can be run using

```
node /path/to/example/file.js
```

## Usage

Simply import and put your functions into the constructor and save it to a variable or pass it as a parameter.

```js
const funlog = require("funlog");

// Log a function
function sum(a, b) {
  return a + b;
}

const loggedSum = funlog(sum);
loggedSum(1, 2);
// console output:
// [funlog] [Fri Feb 07 2020 11:16:27 GMT+0700 (Indochina Time)] [sum] called with:[number:1;number:2;] output [3]
```

The constructor also takes an additional options object, `log` and `logger` are the most important ones (see: [options](#options)).

```js
const yourLogger = console;
const yourLogFunction = function(logger,message) {
    logger.log(message);
}

const options = {
    log: yourLogFunction
    logger: yourLogger
}
```

# Table of Contents

1. [Motivation](#motivation)
2. [Quick start](#quick-start)
3. [Usage](#usage)
4. [API](#api)
5. [Installation](#installation)
6. [Testing](#testing)
7. [Future](#future)
8. [Contributing](#contributing)

## API

### Constructor

The constructor takes in an _object_ or a _function_ as the first parameter and an optional `options` object as the second parameter.
If the first parameter is an object, the constructor returns a new object, preserving the original fields, but replace functions in that object with a logging wrapper function.
If the first parameter is a function, the constructor returns a new function, which is a wrapper around the original function.
It will return `null` in all other cases.

**Syntax**
`const variable = require("funlog")(element,options)`

**Parameters**

- **element** : can be of type _object_ or _function_

  - Required.

- **options**: must be of type _object_

  - Optional. All default options can be view in the [defaultOptions.js][default-options] file

#### options

Properties in the `options` are not currently checked for types and unknown ones are ignored.

- [logger](#logger)
- [log](#log)
- [logErr](#logErr)
- [reThrowErr](#reThrowErr)

#### logger

A logger object, something that could print to an output. It could be the console or any other logger you prefer. If it has an `info` method for printing then you can plug it in. If it doesn't you can still configure a logging function in [log](#log).

- Default value: `console`

#### log

A logging function. It needs to take in 2 parameters (logger,string). This function will be called for printing.

- Default value:

```js
function(logger,message) {
    logger.info(message);
}
```

#### logErr

A logging function specifically for exceptions. It needs to take in 2 parameters (logger,string). This function will be called for printing exceptions.

- Default value:

```js
function(logger,message) {
    logger.error(message);
}
```

#### reThrowErr

A boolean to indicate that the wrapper will rethrow any exceptions out or swallow them.

- Default value: `true`

## Installation

```
npm install funlog
```

In source code

```js
const funlog = require("funlog");
```

is enough to get going.

## Testing

This project uses `Mocha`, `nyc`, `sinon` and `chai` for testing and coverage.
Simply run

```
npm test
```

or

```
npm run coverage
```

## Future

Hopefully will add support for asynchronous functions, better formatting, customization abilities and better exception handling.

## Contributing

If you have any trouble or have some suggestions, don't hesitate to either create a new issue, open a new pull request or just email me at <nguyenqviet98@gmail.com>. All feedbacks are welcomed.

[basic-usage]: https://github.com/axblueblader/funlog/blob/master/examples/basic-usage.js
[example]: https://github.com/axblueblader/funlog/tree/master/examples
[default-options]: https://github.com/axblueblader/funlog/tree/master/src/defaultOptions.js
