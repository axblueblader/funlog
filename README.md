[![Build Status](https://travis-ci.org/axblueblader/funlog.svg?branch=master)](https://travis-ci.org/axblueblader/funlog)

# Funlog

A customizable function-focused Nodejs log wrapper: Log functions input, output and everything in between.

## Motivation

I wrote some handler functions for API routes and wanted automatically log out inputs and outputs of all functions inside an object. The same need arised when trying to debug an application so I decided to write this for daily usage but also for functional programming practice and for fun - hence the name `funlog`.

## Quick start

Check out the [basic usage][basic-usage] and other examples in the [examples folder][example].

## Usage

Simply import and put your functions into the constructor and save it to a variable or pass it as a parameter.

```js
const funlog = require("funlog");

const func = function() {
  console.log("Hi");
};
const loggedFunction = funlog(func);
```

The constructor also takes an additional options object, `log` and `logger` are the most important ones (see: [options](#options)).

```js
const yourLogger = console;
const yourLogFunction = function(logger,string) {
    logger.log(string);
}

const options = {
    log: yourLogFunction
    logger: yourLogger
}
```

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

  - Optional.

#### options

- [logger](#logger)
- [log](#log)
- [preEx](#preEx)
- [durEx](#durEx)
- [postEx](#postEx)

#### logger

A logger object, something that could print to an output. It could be the console or any other logger you prefer. If it has an `info` method for printing that you can plug it in. If it doesn't you can still configure a logging function in [log](#log).

- Default value: `console`

#### log

A logging function. It needs to take in 2 parameters (logger,string). This function will be called for printing.

- Default value:

```js
function(logger,string) {
    logger.info(string);
}
```

#### preEx

A message to print after the function name message and before the printing the arguments.

- Default value: `"Input: "`

#### durEx

A message to print just before the original function gets executed.

- Default value: `"Process: "`

#### postEx

A message to print after execution finished and before printing function output.

- Default value: `"Output: "`

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

This project uses `Mocha`, `nyc` and `chai` for testing and coverage.
Simply run

```
npm test
```

or

```
npm run coverage
```

## Contributing

If you have any trouble or have some suggestions, don't hesitate to either create a new issue, open a new pull request or just email me at <nguyenqviet98@gmail.com>. All feedbacks are welcomed.

[basic-usage]: https://github.com/axblueblader/funlog/blob/master/examples/basic-usage.js
[example]: https://github.com/axblueblader/funlog/tree/master/examples
