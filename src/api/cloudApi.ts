/* eslint-disable no-unused-vars */

import axios from '@/plugins/axios'
import moment from 'moment'
import * as SessionTool from '@/utils/sessionTool'


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
  const checkDateMoment = moment(params.startAt)
  const checkDateMomentEnd = moment(params.endAt)
  const nowDateMoment = moment()

  const nowDate = nowDateMoment.format('YYYY-MM-DD')
  
  const isBeforeDate = checkDateMomentEnd.isBefore(nowDate)
  const isAfterDate = checkDateMoment.isAfter(nowDate + ' 23:59:59')


  const checkData = checkDateMoment.format('YYYY-MM-DD')
  console.log(isBeforeDate, checkData)

  // 如果超过今日天数 返回 0
  if (isAfterDate) {
    return {
      photographyUploadPhotoNum: {
        single: 0,
        multi: 0
      },
      allRetouchPhoto: {
        single: 0,
        multi: 0
      },
      photographOrgUploadStreamNum: 0
    }
  }

  let msg: any = null

  const cacheIngo = SessionTool.getCloudWholeQuota(checkData)

  // 如果在今日之前，且有缓存数据读取缓存数据
  if (isBeforeDate && cacheIngo) {
    msg = cacheIngo
  } else {
    msg = await axios({
      url: '/project_cloud/operator/getWholeQuota',
      method: 'GET',
      params
    })
    if (isBeforeDate) {
      SessionTool.saveCloudWholeQuota(checkData, msg)
    }
  }

  const { photographyUploadPhotoNum, cloudRetouchPhotoNum, outerRetouchPhotoNum } = msg
  const allRetouchPhoto = {
    single: Number(cloudRetouchPhotoNum.single) + Number(outerRetouchPhotoNum.single),
    multi: Number(cloudRetouchPhotoNum.multi) + Number(outerRetouchPhotoNum.multi)
  }

  return {
    photographyUploadPhotoNum,
    allRetouchPhoto,
    photographOrgUploadStreamNum: Number(msg.photographOrgUploadStreamNum)
  }
}

/**
 * @description 修复队列
 */
export function fix2Queue () {
  return axios({
    url: '/project_cloud/temple/fix2Queue',
    method: 'GET'
  })
}
