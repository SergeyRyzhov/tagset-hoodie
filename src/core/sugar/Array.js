import Logger from "../logger.js";
const logger = Logger.getLogger("array.extensions");

export default {
  remove(array, entities) {
    entities = Array.isArray(entities) ? entities : [entities];

    logger.debug("remove %o from %o", entities, array);

    entities.forEach(entity => {
      let index = array.indexOf(entity);
      if (index >= 0) array.splice(index, 1);
    });
  },
  addOrUpdate(array, entities) {
    entities = Array.isArray(entities) ? entities : [entities];

    logger.debug("%o to add or update", entities);

    entities.forEach(entity => {
      var index = array.indexOf(entity);
      if (index >= 0) array[index] = entity;
      else array.push(entity);
    });
  }
};
