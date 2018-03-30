/*eslint no-console: ["off"] */

var buildAppender = config => (message, ...args) => {
  let customMessage = config.name + ": " + message;
  console[config.method].apply(null, [customMessage, ...args]);
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
    if (mapping[method]) logger[method] = buildAppender({ method, name });
    else logger[method] = () => {};
  }

  return logger;
}
export default { getLogger, levels };
