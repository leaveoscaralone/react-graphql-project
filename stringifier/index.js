
// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {
  switch(typeof(input)) {
    case 'number':
      return `${input}`
    case 'string':
      return `"${input}"`
    case 'object':
      if (!input) {
        return 'null'
      }
      if (Array.isArray(input)) {
        let arrString = input.map(stringifier).map(arrVal => !arrVal ? 'null' : arrVal) //applies stringify to each value, if undefined it returns 'null'
        return `[${arrString}]`
      } else { 
        let arrObject = []
        for (let key in input) {
          if (Object.prototype.hasOwnProperty.call(input, key) && input[key] !== undefined && typeof(input[key]) !== 'function' ) {
            arrObject.push(stringifier(key) + ':' + stringifier(input[key]))
          }
        } 
        return '{' + arrObject.join(',') + '}'
    }
  }
}

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}
