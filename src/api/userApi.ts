import axios from '@/plugins/axios'
import * as SessionTool from '@/utils/sessionTool'

/**
 * @description 获取待修图流水数量
 */
export async function createUuid (params: any) {
  const msg: any = await axios({
    url: 'https://1414951603043434.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/cloud_tool/dingTalkLogin/save',
    method: 'GET',
    params
  })
  return msg
}

/**
 * @description 获取待修图流水数量
 */
export async function getXstreamId (params: any) {
  const res: any = await axios({
    url: 'https://1414951603043434.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/cloud_tool/dingTalkLogin/get',
    method: 'GET',
    params
  })
  const time = new Date()
  console.log(res, 'api Xstream', String(time))
  if (res.success === false) return ''
  return res
}

/**
 * @description 获取待修图流水数量
 */
export async function login (params: any): Promise<string> {
  const xStreamId: any = await axios({
    url: '/manage_auth/login/sso',
    method: 'GET',
    headers: { 'X-Expose-Headers': 'X-Stream-Id, x-stream-id' },
    params
  })
  return xStreamId
}

/**
 * @description 判断缓存是否过期
 */
export async function userExpire (): Promise<string> {
  const msg: any = await axios({
    url: '/user_auth/auth/expire',
    method: 'GET'
  })
  SessionTool.setXStreamIdExpireTime(msg)
  return msg
}

/**
 * @description 获取用户信息
 */
export async function info (): Promise<string> {
  const userInfo: any = axios({
    url: '/project_picture_online/admin/staff/getStaffInfo',
    method: 'GET'
  })
  return userInfo
}

/**
 * @description 退出登入
 */
export async function logout () {
  await axios({
    url: '/manage_auth/logout',
    method: 'GET'
  })
  SessionTool.removeSession()
}
