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
  addOrUpdate(array, entities, predicate) {
    entities = Array.isArray(entities) ? entities : [entities];
    let comparer =
      typeof predicate === typeof function() {}
        ? predicate
        : typeof predicate === typeof []
          ? buildComparerByProps(predicate)
          : typeof predicate === typeof ""
            ? buildComparerByProps([predicate])
            : (a, b) => a === b;

    logger.debug("%o to add or update", entities);

    entities.forEach(entity => {
      let index = array.findIndex(item => comparer(item, entity));
      if (index >= 0) array[index] = entity;
      else array.push(entity);
    });
  }
};

function buildComparerByProps(...props) {
  return (a, b) => {
    if (a === b) return true;
    for (let index = 0; index < props.length; index++) {
      const element = props[index];
      if (a[element] !== b[element]) {
        return false;
      }
    }
    return true;
  };
}
