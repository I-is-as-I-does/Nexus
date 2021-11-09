'use strict';

import URL from 'url'

describe('paramToString', function () {
  let paramToString = Utils.default.paramToString
  it('should parse correctly', function () {
    let param = {
      str: 'eleme',
      num: 233,
      truthy: true,
      falsy: false,
      zero: 0,
      space: 'I love\teleme\n.',
      special: '饿了么？お腹がすいたか？배고파?Голоден?\n\r~!@#$%^&*()_+=-`{}[]\\|;:\'"<>,./?',
      unicode: '哲♂学🍔🍱🍷',
      obj: {
        foo: 'bar',
      },
      arr: [
        0,
        null,
        true,
        false,
        undefined,
        '1 2\t3\n\r~!@#$%^&*()_+=-`{}[]\\|;:\'"<>,./?♂🍔',
      ],
    }
    let cookedParam = {}
    for (let key in param) {
      let value = param[key]
      if (Array.isArray(value)) {
        key += '[]'
        cookedParam[key] = value.map(item => '' + item)
      } else if (typeof value === 'object' && value) {
        cookedParam[key] = JSON.stringify(value)
      } else {
        cookedParam[key] = '' + value
      }
    }
    let str = paramToString(param)
    let url = `http://ele.me/index.html?${str}`
    let query = URL.parse(url, true).query
    console.log(JSON.stringify(query) + ' query')
    console.log(JSON.stringify(cookedParam) + ' cooked')
    expect(query).to.deep.equal(cookedParam)
  })
  it('should throw an error when param is not an object', function () {
    const parse = param => {
      return () => {
        paramToString(param)
      }
    }
    expect(parse(null)).to.throw()
    expect(parse('str')).to.throw()
    expect(parse(123)).to.throw()
    expect(parse([1, 2])).to.throw()
    expect(parse(undefined)).to.throw()
    expect(parse(null)).to.throw()
    expect(parse(() => {})).to.throw()
    expect(parse()).to.throw()
    expect(parse({})).to.not.throw()
  })
})
