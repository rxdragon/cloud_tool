/* eslint-disable no-unused-vars */

import axios from '@/plugins/axios'
import moment from 'moment'
import * as SessionTool from '@/utils/sessionTool'
import LevelConfig from '@/views/cloud-center/levelConfig'


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
  staffId: number,
  date: string
}
export async function getStaffLevel (params: getStaffLevelParams) {
  // TODO 调试接口
  // const msg: any = await axios({
  //   // url: '/staff/levelCheckLog',
  //   url: 'https://cfcf2.run.hzmantu.com/project_cloud/temple/getStaffLevel',
  //   method: 'GET',
  //   params
  // })
  const msg: any = {
    log: {
      id: 14,
      staff_id: 613911,
      before_level: 5,
      after_level: 6,
      checked_exp: "15000.00",
      checked_level_up_avg_score: "85.00",
      checked_level_up_num: 30,
      checked_level_down_avg_score: "85.00",
      checked_level_down_num: 30,
      created_at: "1998-01-01 12:00:00",
      updated_at: "1998-01-01 12:00:00"
    },
    staff_info: {
      id: 613911,
      retoucher_class_id: 15,
      role: 460,
      level: 6,
      exp: "0.00",
      promote_at: null,
      identity: "blue",
      entry_tag: "staffEntryTagOneMonth",
      name: "ABC",
      nickname: "好兄弟"
    }
  }

  const checkLevel = _.get(msg, 'log.before_level') || 1
  msg.log.checkLevel = checkLevel
  const matchLevel = LevelConfig[checkLevel]

  msg.log.isExpSuccess = Number(msg.log.checked_exp) >= Number(matchLevel.needExp)
  msg.log.reachUpdateCheckCount = Number(msg.log.checked_level_up_num) >= Number(matchLevel.upDateSpotCount)
  msg.log.reachDownCheckCount = Number(msg.log.checked_level_down_num) >= Number(matchLevel.downDateSpotCount)
  msg.log.canGradeUpdate = Number(msg.log.checked_level_up_avg_score) >= Number(matchLevel.upNeedCheckScore)
  msg.log.canGradeDown = Number(msg.log.checked_level_down_avg_score) < Number(matchLevel.downCheckScore)

  msg.log.canUpdate = msg.log.isExpSuccess && msg.log.reachUpdateCheckCount && msg.log.canGradeUpdate
  msg.log.canDown = msg.log.reachDownCheckCount && msg.log.canGradeDown

  const identity: IDENTIFY = _.get(msg, 'staff_info.identity') || ''
  msg.staff_info.identityToCN = identityToCN[identity] || '异常'

  const createData = {
    checkLog: msg.log,
    staffInfo: msg.staff_info,
    matchLevel
  }
  return createData
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

/**
 * @description 修复外包订单卡单问题
 */
export function apiSubmitStream (params: any) {
  return axios({
    url: '/project_cloud/retoucher/retoucher_stream/apiSubmitStream',
    method: 'POST',
    data: params
  })
}

/**
 * @description 修复外包订单卡单问题
 */
export function fixShowPicStream (params: any) {
  return axios({
    url: '/project_cloud/temple/fixXiuData',
    method: 'GET',
    params
  })
}


/**
 * @description 发送修图师wsId
 */
 type sendStaffWsParams = {
  staffId: string | number,
  type?: string,
  content?: string[]
}
export function sendStaffWs (params: sendStaffWsParams) {
  params.type = 'sendStaffWs'

  if (!params.content) {
    params.content = ['cloud_tool-network']
  }

  return axios({
    url: 'https://api.dev.hzmantu.com/project_cloud/temple/testSendWsByStaffId',
    method: 'POST',
    data: params
  })
}

type getStaffInfoParams = {
  staffId: string | number,
}
export function getStaffNetworkInfo (params: getStaffInfoParams) {
  return axios({
    url: 'https://api.dev.hzmantu.com/project_cloud/temple/getSendWsByStaffIdCache',
    method: 'GET',
    params
  })
}
