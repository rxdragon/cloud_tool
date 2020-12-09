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
