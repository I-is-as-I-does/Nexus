/**
 * @param url {String} - 路由（E.g https://h5.ele.me/sales/，http/https 必须要）
 * @param param {Object} - 路由中所带的参数
 * @param type {String} - hash || search （hash is default.）
 * @param animationType {Number} - 页面打开方式——0： 新页面自下而上压进, 1：新页面自右向左压进
 * @return 完整的 url
 */

const getUrl = (url, param = {}, type = 'hash', animationType = 1) => {
  let result = ''

  if (JSON.stringify(param) !== '{}') {
    result = type === 'hash' ? '#' : '?'
    for (var key in param) {
      let value = param[key]
      if (typeof value === 'object' && value) {
        result += `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}&`
      } else {
        result += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
      }
    }
  }

  result = `${url}${result.replace(/&$/, '')}`

  // 如果在饿了么 APP 中，自动添加 eleme 的 scheme
  if (/Eleme/.test(navigator.userAgent)) {
    result = `eleme://web?url=${encodeURIComponent(result)}&animation_type=${animationType}`
  }

  return result
}

export default getUrl
