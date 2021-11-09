const getType = target => Object.prototype.toString.call(target).slice(8, -1)

const paramToString = param => {
  if (getType(param) !== 'Object') {
    throw 'param 必须是一个 object'
  }
  let result = []
  Object.keys(param).forEach(key => {
    let value = param[key]
    if (Array.isArray(value)) {
      result = result.concat(value.map(item => `${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`))
    } else if (getType(value) === 'Object') {
      value = JSON.stringify(value)
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    } else if (getType(value) !== 'Undefined' && getType(value) !== 'Null') {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  })
  return result.join('&')
}

export default paramToString
