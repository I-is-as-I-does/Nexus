'use strict';
import userAgent from './userAgent.js'
import URL from 'url'

describe('getUrl', function () {
  let getUrl = Utils.default.getUrl
  let url = 'https://h5.ele.me/'
  let param = {
    str: 'eleme',
    num: 233,
    truthy: true,
    falsy: false,
    undef: undefined,
    nul: null,
    zero: 0,
    space: 'I love\teleme\n.',
    special: '饿了么？お腹がすいたか？배고파?Голоден?\n\r~!@#$%^&*()_+=-`{}[]\\|;:\'"<>,./?',
    unicode: '哲♂学🍔🍱🍷',
    obj: {
      foo: 'bar',
      arr: [0, 1, 2],
      child: {
        baz: 'qux',
        arr: [0, 1, 2],
      },
    },
    arr: [
      0,
      null,
      true,
      false,
      undefined,
      '1 2\t3\n\r~!@#$%^&*()_+=-`{}[]\\|;:\'"<>,./?♂🍔',
      {
        obj: {},
        arr: [],
      },
    ],
  }

  describe('when called outside Eleme App', function () {
    before(function () {
      userAgent.set('/Baidu/1.2.3')
    })
    after(function () {
      userAgent.reset()
    })

    it('should return a url', function () {
      expect(getUrl(url, param)).to.startWith(url)
    })
    it('should use search mark', function () {
      expect(getUrl(url, param, 'search'))
        .to.startWith(url + '?')
    })
    it('should use hash mark', function () {
      expect(getUrl(url, param, 'hash'))
        .to.startWith(url + '#')
        .and.equal(getUrl(url, param, 'search').replace('?', '#'))
    })
    it('should use hash mark for default', function () {
      expect(getUrl(url, param))
        .to.equal(getUrl(url, param, 'hash'))
    })
    it('should parse param correctly', function () {
      let stringyParam = {}
      for (let key in param) {
        let value = param[key]
        if (value && typeof value === 'object') {
          value = JSON.stringify(value)
        } else {
          value = '' + value
        }
        stringyParam[key] = value
      }
      let query = URL.parse(getUrl(url, param, 'search'), true).query
      expect(query).to.deep.equal(stringyParam)
    })
    it('should return no hash', function () {
      expect(getUrl(url)).to.equal(url)
    })
    it('should return with default hash', function () {
      expect(getUrl(url + '#default')).to.equal(url + '#default')
    });
  })

  describe('when called in Eleme App', function () {
    let httpUrl
    before(function () {
      userAgent.set('chrome')
      httpUrl = getUrl(url, param)
      userAgent.set('Rajax/1 Apple/iPhone8,2 iPhone_OS/10.0 Eleme/5.12')
    })
    after(function () {
      userAgent.reset()
    })

    const checkAndGetQuery = elemeUrl => {
      let query = URL.parse(elemeUrl, true).query
      expect(elemeUrl).to.startWith('eleme://web?')
      expect(query.url).to.equal(httpUrl)
      return query
    }

    it('should return eleme url', function () {
      let query = checkAndGetQuery(getUrl(url, param))
    })

    it('should set animationType', function () {
      let query = checkAndGetQuery(getUrl(url, param, 'hash' , 0))
      expect(query.animation_type).to.equal('0')

      query = checkAndGetQuery(getUrl(url, param, 'hash' , 1))
      expect(query.animation_type).to.equal('1')
    })

    it('should set animationType to 1 if not specified', function () {
      let query = checkAndGetQuery(getUrl(url, param))
      expect(query.animation_type).to.equal('1')
    })
  })
})
