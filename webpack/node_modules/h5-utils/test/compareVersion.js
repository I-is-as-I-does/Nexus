'use strict';
import userAgent from './userAgent.js'

describe('compareVersion()', function () {
  const compare = Utils.default.compareVersion
  const test = expression => {
    let [left, operator, right] = expression.split(/\s+/)
    expect(left).to.be.not.empty
    expect(right).to.be.not.empty
    expect(operator).to.be.oneOf(['>', '='])
    if (operator === '>') {
      expect(compare(left, right)).to.be.true
      expect(compare(right, left)).to.be.false
    } else {
      expect(compare(left, right)).to.be.false
      expect(compare(right, left)).to.be.false
    }
  }

  it('should compare two versions correctly', function () {
    let expressions = [
      '2 > 1',
      '2.0 > 1.0',
      '2.0 > 1',
      '2 > 1.0',
      '1.1 > 1',
      '1.0.1 > 1',
      '1.0.1 > 1.0.0.0',
      '1..1 > 1.0.0.0',
      '1.077 > 1.64', // 8进制 077 == 63

      '1 = 1',
      '1.0 = 1',
      '1.01 = 1.1',
      '1..1 = 1.0.1',
      '1.... = 1',
      '0 = .',
      '0 = .....',
    ]
    expressions.forEach(test)
  })

  it('should return false when compare invalid versions', function () {
    expect(compare('1.1.1', '1.a.b')).to.be.false
    expect(compare('1.a.b', '1.1.1')).to.be.false
    expect(compare('0', '')).to.be.false
    expect(compare('', '0')).to.be.false
  })

  it('should compare with user agent when 2nd argument not specified', function () {
    if (!userAgent.hackable) return this.skip()

    after(userAgent.reset)

    /* Android */
    userAgent.set('Rajax/1 Nexus_5/hammerhead Android/6.0.1 Display/MOB30D Eleme/5.10.1 ID/e995e821-4533-329f-86dc-42e7258666f8; KERNEL_VERSION:3.4.0-g9539288 API_Level:23')
    expect(compare('5.10.1')).to.be.false
    expect(compare('5.10.1.1')).to.be.true

    /* iOS */
    userAgent.set('Rajax/1 Apple/iPhone8,2 iPhone_OS/10.0 Eleme/5.12 ID/1B6A31BA-011D-4EB3-9E04-2DB3C40022B4; IsJailbroken/0 ASI/CBF98C45-FBA5-4182-8B18-0791DE83412F')
    expect(compare('5.12')).to.be.false
    expect(compare('5.12.1')).to.be.true

    /* Not eleme */
    userAgent.set('meituan/2.3.3')
    expect(compare('9999999999')).to.be.false
  })

  after(function () {
    userAgent.reset()
  })
})
