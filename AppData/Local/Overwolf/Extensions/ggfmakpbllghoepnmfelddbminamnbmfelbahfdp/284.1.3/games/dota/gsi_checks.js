define([
  '/utils/GSI/gsi_utils.js'
], function(gsi_utils) {
  const comparers = gsi_utils.comparers;

  class GsiChecks {
    constructor() {}

    changes = (changes, info, prevInfo) => {
      for (var changeKey in changes) {
        var path = changeKey;
        var newVal = deepValue(path, info);
        var oldVal = deepValue(path, prevInfo);

          var comparer = changes[changeKey];

          if(typeof comparer == 'string') {
          if (!comparers[comparer]) {
            throw new Error("Comparer defined for change " + changeKey + ' is not valid');
          } else {
            comparer = comparers[comparer];
          }

            return comparer(newVal,oldVal);
        } else if (typeof comparer == 'object') {
          return comparers.fromTo(newVal,oldVal, comparer.to, comparer.from)
        } else if (typeof comparer != 'function') {
          throw new Error("Comparer defined for change " + changeKey + ' is not a string nor a function not an object');
        }

          return comparer(newVal,oldVal);
      }

        return false;
    }

      where = (where, info, prevInfo) => {
      for (var whereKey in where) {
        var path = whereKey;
        var newVal = deepValue(path, info);

          var comparer = typeof where[whereKey] == 'function'
          ? where[whereKey]
          : Object.keys(where[whereKey])[0];
        var val = deepValue(path, prevInfo);

          if (typeof comparer == 'string') {
          if (!comparers[comparer]) {
            throw new Error("Comparer defined for change " + whereKey + ' is not valid');
          }
          else {
            comparer = comparers[comparer];
          }

            if (!comparer(newVal,val)) {
            return false;
          }
        } else if (typeof comparer == 'object') {
          if (!comparers.fromTo(newVal,val, comparer.to, comparer.from)) {
            return false;
          }
        } else if (typeof comparer != 'function') {
          throw new Error("Comparer defined for change " + whereKey + ' is not a string nor a function not an object');
        }
        if (!comparer(newVal,val)) {
          return false;
        }

        }

        return true;
    }

      added = (added, info, prevInfo) => {
      if (!info.added) {
        return false;
      }

        for (var i=0;i<added.length;i++) {
        if (deepValue(added[i], info) != null &&
            deepValue(added[i], prevInfo) == null) {
          return true;
        }
      }

        return false;
    }

      removed = (removed, info, prevInfo) => {
      for (var i=0; i < removed.length; i++) {
        if (deepValue(removed[i], prevInfo) != null &&
            deepValue(removed[i], info) == null) {
          return true;
        }
      }

        return false;
    }

      same = (same, info, prevInfo) => {
      for (var i=0; i < same.length; i++) {
        if (deepValue(same[i], prevInfo) != deepValue(same[i], info)) {
          return false;
        }
      }

        return true;
    }
  }

  function deepValue(path, obj) {
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++) {
      if (_.isUndefined(obj[path[i]])) {
        return null;
      }

      obj = obj[path[i]];
    }

    return obj;
  }

  return GsiChecks;
});