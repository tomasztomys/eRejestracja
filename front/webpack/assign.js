/* eslint-disable */

module.exports = function assign(source, target) {
  if(source instanceof Array && target instanceof Array) {
    return source.concat(target)
  }

  if(source instanceof Object && target instanceof Object) {
    Object
      .keys(target)
      .forEach(function(key) {
        source[key] = assign(source[key], target[key])
      })

    return source
  }

  return target
}