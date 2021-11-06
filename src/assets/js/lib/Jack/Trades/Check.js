export function isNonEmptyArr(it) {
  return it instanceof Array && it.length;
}
export function isNonEmptyObj(it) {
  return it instanceof Object && it !== null;
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
