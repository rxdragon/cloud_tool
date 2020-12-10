/**
 * @description 存储获取xStreamID票据
 * @param {*} info
 */
export function setUserUUID (uuid: string) {
  const data = uuid
  sessionStorage.setItem('userUUID', data)
}

/**
 * @description
 * @param {*} code
 */
export function getUserUUID () {
  try {
    const data = sessionStorage.getItem('userUUID')
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
  sessionStorage.removeItem('userUUID')
}

/**
 * @description 存储xStreamId
 * @param {*} xStreamId
 */
export function setXStreamId (xStreamId: string) {
  sessionStorage.setItem('xStreamId', xStreamId)
}

/**
 * @description 获取XStreamId
 */
export function getXStreamId () {
  return sessionStorage.getItem('xStreamId')
}

/**
 * @description 设置登录过期时间
 * @param {*} time
 */
export function setXStreamIdExpireTime (time: any) {
  sessionStorage.setItem('xStreamIdExpireTime', time)
}

/**
 * @description 获取登录过期时间
 * @param {*} time
 */
export function getStreamIdExpireTime (): number {
  const returnTime = sessionStorage.getItem('xStreamIdExpireTime')
  return Number(returnTime)
}

/**
 * @description 存储用户信息
 * @param {*} info
 */
export function setUserInfo (info: any) {
  const data: any = JSON.stringify(info)
  sessionStorage.setItem('cloud-tool-userInfo', data)
}

/**
 * @description 获取用户信息
 */
export function getUserInfo () {
  try {
    const data: any = sessionStorage.getItem('cloud-tool-userInfo')
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}
