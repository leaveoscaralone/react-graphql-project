
// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {
  switch(typeof(input)) {
    case 'number':
      return `${input}`
    case 'string':
      return `"${input}"`
    case 'object':
      if (Array.isArray(input)) {
        return `[${input.toString()}]`
      } else if (!input) {
        return 'null'
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
