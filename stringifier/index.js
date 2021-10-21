
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
        let arrString = input.map(stringifier).map(arrVal => !arrVal ? 'null' : arrVal)
        return `[${arrString}]`
      } else {
      for (let [key, value] of Object.entries(input)) {
        return `{${stringifier(key)}: ${stringifier(value)}}`
      }
    }
  }
}

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}
