'use strict'

let originalUserAgent = window.navigator.userAgent
let hackedUserAgent = 'test'
let hackable = false
try {
  // hack
  Object.defineProperty(window.navigator, 'userAgent', {
    get: () => hackedUserAgent
  })
  if (window.navigator.userAgent !== 'test') throw 'failed'
  hackable = true
  hackedUserAgent = originalUserAgent
} catch (e) {
  // failed
}

let setUserAgent = function (userAgent) {
  hackedUserAgent = userAgent
}

let resetUserAgent = function () {
  hackedUserAgent = originalUserAgent
}

export default {
  hackable,
	set: setUserAgent,
  reset: resetUserAgent,
}
