/* eslint-disable no-unused-vars */

import { waitTime } from "@/utils/timeUtil"

/**
 * @description 修图标准
 */
export const RETOUCH_STANDARDS = {
  MANTO: 'mainto', // 缦图
  BLUE: 'blue', // 蓝标
  MASTER: 'master', // 等待审核
}

/**
 * @description 修图状态中文
 */
export const RetouchStandard = {
  [RETOUCH_STANDARDS.MANTO]: '缦图',
  [RETOUCH_STANDARDS.BLUE]: '蓝标',
  [RETOUCH_STANDARDS.MASTER]: '大师',
}

/**
 * @description 流水状态
 */
export const STREAM_STATE = {
  WAIT_RETOUCH: 'wait_retouch', // 待修图
  RETOUCHING: 'retouching', // 修图中
  REVIEW_RETURN_RETOUCH: 'review_return_retouch', // 审核退回修图中
  WAIT_REVIEW: 'wait_review', // 等待审核
  REVIEWING: 'reviewing', // 审核中
  FINISH: 'finish', // 审核完成
  STORE_RETURN_RETOUCH: 'store_return_retouch', // 门店退回
  HANGING: 'hanging' // 挂起中
}

/**
 * @description 流水状态中文
 */
export const StreamState = {
  [STREAM_STATE.WAIT_RETOUCH]: '待修图',
  [STREAM_STATE.RETOUCHING]: '修图中',
  [STREAM_STATE.REVIEW_RETURN_RETOUCH]: '审核退回修图中',
  [STREAM_STATE.WAIT_REVIEW]: '等待审核',
  [STREAM_STATE.REVIEWING]: '审核中',
  [STREAM_STATE.FINISH]: '审核完成',
  [STREAM_STATE.STORE_RETURN_RETOUCH]: '门店退回',
  [STREAM_STATE.HANGING]: '挂起中'
}

/**
 * @description 修图要求
 */
export const RETOUCH_ORDER = {
  SMALL: 'small', // 缦图
  MIDDLE: 'middle', // 蓝标
  BIG: 'big', // 等待审核
}

/**
 * @description 修图状态中文
 */
export const RetouchOrder = {
  [RETOUCH_ORDER.SMALL]: '小',
  [RETOUCH_ORDER.MIDDLE]: '中',
  [RETOUCH_ORDER.BIG]: '大',
}

export interface SearchOrderInterface {
  base: {},
  queueIndexs: string | number
  retouchStandards: string
  orderInfos: {
    externalNum: string
    streamNum: string
    producName: string
    photoCount: string | number
  }
  retouchClaims: { eye: string, face: string, pimples: boolean }
  storeNames: string
  photographers: string
  orderNotes: string
  photoStreams : any
  retouchers: { retoucher: string; retoucherLeader: string; OrgName: string }
  reviewers: string
  photographerOrgNames: string
  retouchTimes: string
  waitTimes: string
  states: string
}

export default class SearchOrderModel implements SearchOrderInterface {
  base = {}
  queueIndexs = '' // 订单在队列中的位置
  retouchStandards = '' // 修图标准
  orderInfos = { externalNum: '', streamNum: '', producName: '', photoCount: '' } // 订单信息
  retouchers = { retoucher: '', retoucherLeader: '', OrgName: '' } // 修图师信息
  retouchClaims = { eye: '', face: '', pimples: false } // 修图要求
  storeNames = '' // 门店
  photographers = '' // 摄影师
  orderNotes = '' // 修图要求
  photoStreams = '' // 照片流
  reviewers = '' // 审核人
  photographerOrgNames = '' // 摄影机构
  retouchTimes = '' // 修图时间
  waitTimes = '' // 等待时间
  states = '' // 当前状态

  constructor (searchOrderData: any) {
    this.base = searchOrderData
    // 获取位置和修图标准信息
    this.queueIndexs = _.get(searchOrderData, 'queue_index') || '-'
    this.retouchStandards = RetouchStandard[_.get(searchOrderData, 'product.retouch_standard')] || '-'

    // 获取订单信息
    this.orderInfos.externalNum = (searchOrderData.order && _.get(searchOrderData, 'order.external_num')) || '-'
    this.orderInfos.streamNum = searchOrderData.stream_num || '-'
    this.orderInfos.producName = _.get(searchOrderData, 'product.name') || '-'
    this.orderInfos.photoCount = searchOrderData.photos.filter((item: any) => +item.people_num > 0).length || '-'

    // 修图要求
    this.retouchClaims.eye = RetouchOrder[_.get(searchOrderData, 'tags.values.retouch_claim.eye')] || '-'
    this.retouchClaims.face = RetouchOrder[_.get(searchOrderData, 'tags.values.retouch_claim.face')] || '-'
    this.retouchClaims.pimples = _.get(searchOrderData, 'tags.values.retouch_claim.pimples') || '-'

    this.photographers = _.get(searchOrderData, 'order.tags.values.photographer') || '-'
    this.storeNames = _.get(searchOrderData, 'order.tags.values.store_name') || '-'
    this.orderNotes = _.get(searchOrderData, 'note.retouch_note') || _.get(searchOrderData, 'order.note.orderNote') || '-'

    // 处理照片流信息
    this.photoStreams = searchOrderData.photos.map((item: any) => {
      const special_efficacy = _.get(item, 'tags.values.special_efficacy') || '-'
      const origin_photo_path = _.get(item, 'tags.values.origin_photo_path') || _.get(item, 'other_photo_version[0].path') || '-'

      return {
        special_efficacy,
        origin_photo_path
      }
    })

    // 获取修图师和组长和机构信息
    this.retouchers.retoucher = _.get(searchOrderData, 'retoucher.name') || _.get(searchOrderData, 'retoucher.real_name') ||
    _.get(searchOrderData, 'tags.values.retoucher_name') || '-'
    this.retouchers.retoucherLeader = _.get(searchOrderData, 'retoucher.retoucher_leader.nickname') || _.get(searchOrderData, 'retoucher.retoucher_leader.name') || '-'
    this.retouchers.OrgName = _.get(searchOrderData, 'retoucher_org.name') || '-'

    // 获取审核人和摄影机构信息
    this.reviewers = _.get(searchOrderData, 'reviewer.name') || _.get(searchOrderData, 'reviewer.real_name') || '-'
    this.photographerOrgNames = _.get(searchOrderData, 'order.photographer_org.name') || '-'

    // 获取修图和等待时间信息
    this.retouchTimes = waitTime(searchOrderData.receipt_at, searchOrderData.pass_at) || '-'
    this.waitTimes = waitTime(searchOrderData.created_at, searchOrderData.pass_at) || '-'
    
    // 获取当前状态信息
    this.states = StreamState[searchOrderData.state] || '-'
  }
}
