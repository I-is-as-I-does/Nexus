/**
 * @param {Object} arguments
 * @param {Number} arguments.id - 商家 id
 * @param {Array} arguments.entities - web-cart 中的商品
 * @param {Function} arguments.callback - 下单成功后 APP 会调用这个方法。比如这个 Function 的作用是用来清空本地购物车
 */

import compareVersion from './compareVersion'

export default ({ id, entities, callback }) => {
  let cartOperations = {
    clear_cart: true,
  }
  // App version >= 7.2 时，加了多属性规则。参数有变化
  if (!compareVersion('7.2')) {
    cartOperations.add_foods = entities
    .map(({ id, sku_id, quantity, specs, attrs }) => ({
      id,
      sku_id: sku_id || '',
      quantity,
      specs: specs,
      attrs: attrs,
    }))
  } else {
    cartOperations.add_foods = entities.map(({ id, quantity, specs }) => ({
      id,
      quantity,
      specs: specs.map(spec => spec.value),
    }))
  }

  // connect to APP checkout page.
  location.href = `eleme://checkout?restaurant_id=${id}&cart_operations=${JSON.stringify(cartOperations)}`
}
