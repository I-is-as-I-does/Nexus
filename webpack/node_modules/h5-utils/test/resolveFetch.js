'use strict';

describe('resolveFetch', function () {
  let resolveFetch = Utils.default.resolveFetch;
  const createResponse = function (status = 200, body = '') {
    return new Response(body, { status })
  }
  const get = function () {
    return resolveFetch(createResponse(...arguments))
  }
  let obj = {
    foo: 'bar',
    child: {
      arr: [1, 2],
    },
  }
  it('should resolve with a parsed object', function () {
    return expect(get(200, JSON.stringify(obj))).to.eventually.deep.equal(obj)
  })
  it('should reject when not not 2xx', function () {
    return Promise.all([
      expect(get(303, 'See Other')).to.eventually.be.rejected,
      expect(get(403, 'Forbidden')).to.eventually.be.rejected,
      expect(get(404, 'Not Found')).to.eventually.be.rejected,
      expect(get(502, 'Bad Gateway')).to.eventually.be.rejected,
    ])
  })
  it('should reject with a parsed object', function () {
    return Promise.all([
      expect(get(303, JSON.stringify(obj))).to.eventually.be.rejected.with.an('object').that.deep.equal(obj),
      expect(get(403, JSON.stringify(obj))).to.eventually.be.rejected.with.an('object').that.deep.equal(obj),
      expect(get(404, JSON.stringify(obj))).to.eventually.be.rejected.with.an('object').that.deep.equal(obj),
      expect(get(502, JSON.stringify(obj))).to.eventually.be.rejected.with.an('object').that.deep.equal(obj),
    ])
  })
})
