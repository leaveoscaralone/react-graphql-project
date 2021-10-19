
var _ = {};

// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.
_.first = function (array, n) {
  // check if passed object is an array
  if (!array) {
    return [];
  }
  if (!n || n <= 0) {
    n = 1
  }
  return Array.prototype.slice.call(array, 0, n)
};

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
  //check if passed object is an array
  if (!array) {
    return [];
  }
  if (n >= array.length) {
    return array
  }
  if (!n || n <= 0) {
    n = 1
  }
  return Array.prototype.slice.call(array, array.length - n, array.length)

};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
  let newArr = []
  for (let i = 0; i < array.length; i++) {
    if (!newArr.includes(array[i])) {
      newArr.push(array[i])  
    }
  }
  return newArr
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      destination[key] = source[key]
    }
  }
  return destination
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
  let dKeys = Object.keys(destination)
  for (let sKeys in source) {
    if (Object.prototype.hasOwnProperty.call(source, sKeys) && !dKeys.includes(sKeys)) {
      destination[sKeys] = source[sKeys]
    }
  }
  return destination
};

// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  if (Array.isArray(collection)) {
    for (let i in collection) {
      iteratee.call(context, collection[i], parseInt(i), collection)
    }
  } else {
    for (let key of Object.keys(collection)) {
      iteratee.call(context, collection[key], key, collection)
    }
  }
  return collection
};

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {
  let newArr = []
  if (Array.isArray(collection)) {
    for (let i in collection) {
      newArr.push(iteratee.call(context, collection[i], i, collection))
    }
  } else {
    for (let key of Object.keys(collection)) {
      newArr.push(iteratee.call(context, collection[key], key, collection))
    }
  }
  return newArr
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
  _.each(collection, function (val, i, array) {
    if (!accumulator) {
      accumulator = val;
    } else {
      accumulator = iteratee.call(context, accumulator, val, i, array);
    }
  });
  return accumulator;
};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
  let newArr = []
  for (let key of Object.keys(collection)) {
    if (predicate.call(context, collection[key], key, collection)) {
      newArr.push(collection[key])
    }
  }
  return newArr
};

// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
  let binded = predicate.bind(context)
  return _.filter(collection, function (val, i, collection){
    return !binded(val, i, collection)
  })
};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
  let eval = true
  _.each(collection, function (val, i, collection) {
    if (!predicate.call(context, val, i, collection)) {
      eval = false
    }
  })
  return eval
};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  let binded = predicate.bind(context)
  return !_.every(collection, function (val, i, collection) {
    return !binded(val, i, collection)
  })
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName, ...args) {
  let newArr = []
  for (let key of Object.keys(collection)) {
    newArr.push(collection[key][methodName](...args))
  }
  return newArr
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
  return _.map(collection, function (val, i, collection) {
    return val[propertyName]
  }, 
  context)
};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.
_.once = function (func) {
  let used = false
  let result
  return function () {
    if (!used) {
      used = true
      result = func.apply(this, arguments)
    }
    return result
  }
}


// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
  let results = {}
  return function() {
    let arg = Array.prototype.join.call(arguments, '_')
    if (!results[arg]) {
      results[arg] = func.apply(this, arguments)
    }
    return results[arg]
  }
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait) {
  let arg = Array.prototype.slice.call(arguments, 2)
  setTimeout(function() {
    func.apply(this, arg)
  }, wait)
};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {

};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}
