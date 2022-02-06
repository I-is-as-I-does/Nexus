/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

export function isNonEmptyArr(it) {
  return Array.isArray(it) && it.length;
}
export function isNonEmptyObj(it) {
  return it !== null && it.constructor.name == 'Object' && Object.keys(it).length;
}
export function isNonEmptyStr(it) {
  return (typeof it === "string" || it instanceof String) && it.length;
}
export function seemsLikeValidDate(string) {
  return isNonEmptyStr(string) && !isNaN(new Date(string));
}
export function isElement(Obj) {
  return Obj instanceof Element;
}
export function isEmpty(it){
  if(typeof it == 'object'){
    return !Object.keys(it).length
  }
  return !it || !it.length;
 }
 