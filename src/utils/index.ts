/**
 * @description 是否为对象
 */
export function isObj (obj: object) {
  if (!obj) return false
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 下划线转大驼峰
 * @param {*} name
 */
export function toCapitalHump (name: string) {
  name = name.charAt(0).toUpperCase() + name.slice(1)
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * @description 获取现在时间
 */
export function delayLoading (time = 500): Promise <void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
