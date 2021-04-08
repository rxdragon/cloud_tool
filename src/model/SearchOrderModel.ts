/* eslint-disable no-unused-vars */
/**
 * @description 订单状态
 */
export enum PICTURE_ONLINE_ORDER_STATE {
  /** 待修图 */
  WAIT_RETOUCH = 'wait_retouch',
  /** 修图中 */
  RETOUCHING = 'retouching',
  /** 待审核 */
  WAIT_REVIEW = 'wait_review',
  /** 审核中 */
  REVIEWING = 'reviewing',
}

/**
 * @description 订单中文
 */
export const pictureOnlineStateToCN = {
  [PICTURE_ONLINE_ORDER_STATE.WAIT_RETOUCH]: '待修图',
  [PICTURE_ONLINE_ORDER_STATE.RETOUCHING]: '修图中',
  [PICTURE_ONLINE_ORDER_STATE.WAIT_REVIEW]: '等待审核',
  [PICTURE_ONLINE_ORDER_STATE.REVIEWING]: '审核中',
}

export interface SearchOrderInterface {
  base: {},
  location: string | number
  picStandard: string
  orderInfo: {
    orderNum: string
    waterNum: string
    photoProduct: string
    photoCount: string | number
  }
  picFixer: { fixer: string; fixerLeader: string }
  auditor: string
  photographyStudio: string
  fixTime: string
  waitTime: string
  status: string
  operation: string
}

export default class SearchOrderModel implements SearchOrderInterface {
  base = {}
  location = '' // 订单在队列中的位置
  picStandard = '' // 修图标准
  orderInfo = { orderNum: '', waterNum: '', photoProduct: '', photoCount: '' } // 订单信息
  picFixer = { fixer: '-', fixerLeader: '-' } // 修图师信息
  auditor = '-' // 审核人
  photographyStudio = '' // 摄影机构
  fixTime = '-' // 修图时间
  waitTime = '' // 等待时间
  status = '' // 当前状态
  operation = '-' // 操作

  constructor (searchOrderData: any) {
    this.base = searchOrderData
    this.location = _.get(searchOrderData, 'location') || ''
    this.picStandard = _.get(searchOrderData, 'picStandard') || ''

    // 获取订单信息
    const orderInfo = _.get(searchOrderData, 'outside_order.extends.orderInfo') || []
    this.orderInfo = {
      orderNum: orderInfo.orderNum,
      waterNum: orderInfo.waterNum,
      photoProduct: orderInfo.photoProduct,
      photoCount: orderInfo.photoCount
    }

    // 获取修图师信息
    const picFixer = _.get(searchOrderData, 'outside_order.extends.picFixer') || {}
    this.picFixer = { fixer: picFixer.fixer, fixerLeader: picFixer.fixerLeader }

    this.auditor = searchOrderData.auditor || '-'
    this.photographyStudio = searchOrderData.photographyStudio || ''
    this.fixTime = searchOrderData.fixTime || '-'
    this.waitTime = searchOrderData.waitTime || ''
    this.status = _.get(searchOrderData, 'extends.status') || ''
    this.operation = _.get(searchOrderData, 'extends.operation') || '-'
  }
}
