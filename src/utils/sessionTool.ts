/**
 * @description 存储获取xStreamID票据
 * @param {*} info
 */
export function setUserUUID (uuid: string) {
  const data = uuid
  localStorage.setItem('userUUID', data)
}

/**
 * @description
 * @param {*} code
 */
export function getUserUUID () {
  try {
    const data = localStorage.getItem('userUUID')
    return data
  } catch (error) {
    return null
  }
}

/**
 * @description
 * @param {*} code
 */
export function cleanUserUUID () {
  localStorage.removeItem('userUUID')
}

/**
 * @description 存储xStreamId
 * @param {*} xStreamId
 */
export function setXStreamId (xStreamId: string) {
  localStorage.setItem('xStreamId', xStreamId)
}

/**
 * @description 获取XStreamId
 */
export function getXStreamId () {
  return localStorage.getItem('xStreamId')
}

/**
 * @description 设置登录过期时间
 * @param {*} time
 */
export function setXStreamIdExpireTime (time: any) {
  localStorage.setItem('xStreamIdExpireTime', time)
}

/**
 * @description 获取登录过期时间
 * @param {*} time
 */
export function getStreamIdExpireTime (): number {
  const returnTime = localStorage.getItem('xStreamIdExpireTime')
  return Number(returnTime)
}

/**
 * @description 存储用户信息
 * @param {*} info
 */
export function setUserInfo (info: any) {
  const data: any = JSON.stringify(info)
  localStorage.setItem('cloud-tool-userInfo', data)
}

/**
 * @description 获取用户信息
 */
export function getUserInfo () {
  try {
    const data: any = localStorage.getItem('cloud-tool-userInfo')
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

/**
 * @description 清空全部localStorage缓存
 */
export function removeSession () {
  sessionStorage.clear()
  localStorage.clear()
}

/**
 * @description 缓存指标信息
 * @param date 
 * @param msg 
 */
export function saveCloudWholeQuota (date: string, msg: any) {
  const data: any = JSON.stringify(msg)
  const prefix = 'cloud-quota'
  localStorage.setItem(`${prefix}-${date}`, data)
}

/**
 * @description 获取指标
 * @param date 
 */
export function getCloudWholeQuota (date: string) {
  const prefix = 'cloud-quota'
  const data: any = localStorage.getItem(`${prefix}-${date}`)
  return JSON.parse(data)
}
