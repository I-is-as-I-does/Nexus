/**
 * @param {String} compare - 比较版本
 * @param {String} beCompared 被比较版本 - 默认为当前 APP 版本
 * @returns {Boolean} - 比较版本是否比被比较版本新
 */
const compareVersion = (compare, beCompared) => {
 if (!beCompared) {
   beCompared = (window.navigator.userAgent.match(/Eleme\/([\d|\.]+)/i) || [])[1]
   if (!beCompared) return false
 }

 compare = compare.split('.')
 beCompared = beCompared.split('.')

 let result
 compare.forEach((compareItem, index) => {
   let beComparedItem = beCompared[index]
   if (typeof beComparedItem === 'undefined') beComparedItem = 0
   if (typeof result !== 'undefined') return

   let difference = Number(compareItem) - Number(beComparedItem)
   if (difference === 0) return
   result = difference > 0
 })
 return !!result
}

export default compareVersion
