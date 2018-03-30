/*eslint no-console: ["off"] */
import Config from "../config.js";

export default new LoggerFactory();

function LoggerFactory() {
  this.levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
    all: 5
  };

  this.getLogger = getLogger.bind(this);

  this._buffer = [];
}

function getLogger(name, level) {
  level = level || Config.level;
  let mapping = {
    group: { enabled: true, lazy: true },
    groupCollapsed: { enabled: true, lazy: true },
    groupEnd: { enabled: true, evaluate: true },
    log: { enabled: level >= this.levels.all, evaluate1: true },
    trace: { enabled: level >= this.levels.trace, evaluate1: true },
    debug: { enabled: level >= this.levels.debug, evaluate1: true },
    info: { enabled: level >= this.levels.info, evaluate1: true },
    warn: { enabled: level >= this.levels.warn, evaluate1: true },
    error: { enabled: level >= this.levels.error, evaluate1: true }
  };
  var logger = {};
  for (const method in mapping) {
    var options = mapping[method];
    if (options.enabled) {
      // if (!options.lazy && !options.evaluate) {
      logger[method] = _buildAppender({
        buffer: this._buffer,
        method,
        name,
        evaluate: !!options.evaluate,
        lazy: !!options.lazy
      });
      // }else{

      // }
    } else logger[method] = () => {};
  }

  return logger;
}

function _getCaller() {
  const error = (() => {
    try {
      throw new Error();
    } catch (e) {
      return e;
    }
  })();
  const stackLines = (!error.stack ? "" : error.stack).split("\n");
  const callerLine = stackLines[4] || "";
  const tokens = callerLine.split(/\s+/);
  const place = tokens.pop();
  const method = tokens.length >= 3 ? tokens.pop() : null;
  return {
    method,
    place
  };
}

function _buildAppender(config) {
  return (message, ...args) => {
    let caller = _getCaller();
    let info = "";
    if (caller.method) {
      let customMessage = "%s: %s {%o} " + message;
      info = [
        customMessage,
        config.name,
        caller.method || config.name,
        caller.place
      ];
    } else {
      let customMessage = "%s: {%o} " + message;
      info = [customMessage, config.name, caller.place];
    }

    if (config.lazy) {
      config.buffer.push([]);
    }

    var buffer =
      config.buffer.length == 0
        ? config.buffer
        : config.buffer[config.buffer.length - 1];
    buffer.push({ method: config.method, args: [...info, ...args] });

    if (config.evaluate || config.buffer.length == 0) {
      if (buffer.length > 2)
        while (buffer.length > 0) {
          var cache = buffer.shift();
          console[cache.method].apply(null, cache.args);
        }
      if (config.buffer.length > 0) config.buffer.pop();
    }
  };
}
