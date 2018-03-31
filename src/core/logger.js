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
    group: { enabled: Config.allowGroupping, lazy: true },
    groupCollapsed: { enabled: Config.allowGroupping, lazy: true },
    groupEnd: { enabled: Config.allowGroupping, evaluate: true },
    log: { enabled: level >= this.levels.all },
    trace: { enabled: level >= this.levels.trace },
    debug: { enabled: level >= this.levels.debug },
    info: { enabled: level >= this.levels.info },
    warn: { enabled: level >= this.levels.warn },
    error: { enabled: level >= this.levels.error }
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
    try {
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

      let currentCache = { method: config.method, args: [...info, ...args] };
      if (config.lazy) {
        config.buffer.push([currentCache]);
        return;
      }

      if (config.evaluate && config.buffer.length > 0) {
        buffer = config.buffer.pop();
        if (buffer.length <= 1) return;

        buffer.push(currentCache);
        while (buffer.length > 0) {
          let cache = buffer.shift();
          console[cache.method].apply(null, cache.args);
        }
      }

      let buffer =
        config.buffer.length > 0
          ? !Array.isArray(config.buffer[config.buffer.length - 1])
            ? config.buffer
            : config.buffer[config.buffer.length - 1]
          : config.buffer;

      buffer.push(currentCache);
      if (buffer === config.buffer) {
        let cache = buffer.shift();
        console[cache.method].apply(null, cache.args);
      }
    } catch (e) {
      console.error("Logger error", e);
    }
  };
}
