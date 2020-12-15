/* eslint-disable no-unused-vars */

import axios from '@/plugins/axios'

/**
 * @description 身份枚举
 */
export enum IDENTIFY {
  BLUE = 'blue',
  MASTER = 'master',
  MAINTO = 'mainto'
}

/**
 * @description 身份中文
 */
export const identityToCN = {
  [IDENTIFY.BLUE]: '蓝标',
  [IDENTIFY.MASTER]: '大师',
  [IDENTIFY.MAINTO]: '缦图'
}

/**
 * @description 获取待修图流水数量
 */
export async function getQueueLength () {
  const msg: any = await axios({
    url: '/project_cloud/temple/getQueueLength?queueName=waitRetouchStreamQueue',
    method: 'GET'
  })
  return msg[0].waitRetouchStreamQueueLength || 0
}

/**
 * @description 获取排队流水数量
 */
export async function getRetoucherQueueLength () {
  const msg: any = await axios({
    url: '/project_cloud/temple/getQueueLength?queueName=retoucherQueue',
    method: 'GET'
  })
  return msg[0].retoucherQueueLength || 0
}

/**
 * @description 获取待审核数量
 */
export async function getWaitReviewStreamQueue () {
  const msg: any = await axios({
    url: '/project_cloud/temple/getQueueLength?queueName=waitReviewStreamQueue',
    method: 'GET'
  })
  return msg[0].waitReviewStreamQueueLength || 0
}

/**
 * @description 获取审核人队列
 */
export async function getReviewerQueue () {
  const msg: any = await axios({
    url: '/project_cloud/temple/getQueueLength?queueName=reviewerQueue',
    method: 'GET'
  })
  return msg[0].reviewerQueueLength || 0
}

/**
 * @description 获取排队流水数量
 */

type getStaffLevelParams = {
  staffId: number
}
export async function getStaffLevel (params: getStaffLevelParams) {
  const msg: any = await axios({
    url: 'https://cf2.run.hzmantu.com/project_cloud/temple/getStaffLevel',
    method: 'PUT',
    data: params
  })

  const staffReturnRate = (msg.staffReturnRate * 100).toFixed(3)
  msg.staffReturnRate = Number(staffReturnRate)
  const needReturnQuota = (msg.needReturnQuota * 100).toFixed(3)
  msg.needReturnQuota = Number(needReturnQuota)

  msg.staffRetouchTime = Number(msg.staffRetouchTime).toFixed(3)
  msg.exp = Number(msg.exp)

  msg.identityCN = identityToCN[msg.identity as IDENTIFY]
  
  msg.isExpSuccess = msg.exp >= msg.needExp
  msg.isRetouchTimeSuccess = msg.staffRetouchTime <= msg.needRetouchTime
  msg.isStaffReturnRateSuccess = msg.staffReturnRate <= msg.needReturnQuota

  console.log(msg)
  return msg
}

/**
 * @description 获取总体绩效
 * @param params
 */
export async function getWholeQuota (params: any) {
  const msg: any = await axios({
    url: '/project_cloud/operator/getWholeQuota',
    method: 'GET',
    params
  })
  const { photographyUploadPhotoNum } = msg
  console.log(photographyUploadPhotoNum)
}
