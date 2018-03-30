/*eslint no-console: ["off"] */
import Config from '../config.js'

export default new LoggerFactory();

function LoggerFactory(){
  this.levels = {
    error: 0,
    warn: 1,
    all: 2
  };

  this.getLogger = getLogger;
}

function getLogger(name, level) {
  level = level || Config.level;
  let mapping = {
    log: level >= this.levels.all,
    info: level >= this.levels.all,
    debug: level >= this.levels.all,
    trace: level >= this.levels.all,
    warn: level >= this.levels.warn,
    error: level >= this.levels.error
  };
  var logger = {};
  for (const method in mapping) {
    if (mapping[method]) logger[method] = _buildAppender({ method, name });
    else logger[method] = () => {};
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
    console[config.method].apply(null, [...info, ...args]);
  };
}