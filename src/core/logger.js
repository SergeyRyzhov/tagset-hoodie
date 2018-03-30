/*eslint no-console: ["off"] */

export default {
  levels,
  getLogger
};

const levels = {
  error: 0,
  warn: 1,
  all: 2
};

function getLogger(name, level) {
  level = level || levels.all;
  let mapping = {
    log: level >= levels.all,
    info: level >= levels.all,
    debug: level >= levels.all,
    trace: level >= levels.all,
    warn: level >= levels.warn,
    error: level >= levels.error
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
