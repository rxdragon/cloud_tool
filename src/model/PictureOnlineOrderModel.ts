/* eslint-disable no-unused-vars */
/**
 * @description 看片类型
 */
export enum WATCH_TYPE {
  /** 在线 */
  ONLINE = 'online',
  /** 门店 */
  OFFLINE = 'offline'
}

/**
 * @description 订单状态
 */
export enum PICTURE_ONLINE_ORDER_STATE {
  /** 待反馈 */
  WAIT_FEEDBACK = 'wait_feedback',
  /** 待接单 */
  UNPROCESSED = 'unprocessed',
  /** 处理中 */
  PROCESSING = 'processing',
  /** 已完成 */
  FINISHED = 'finished',
  /** 已关闭 */
  CLOSED = 'closed'
}

/**
 * @description 订单中文
 */
export const pictureOnlineStateToCN = {
  [PICTURE_ONLINE_ORDER_STATE.WAIT_FEEDBACK]: '待反馈',
  [PICTURE_ONLINE_ORDER_STATE.UNPROCESSED]: '待接单',
  [PICTURE_ONLINE_ORDER_STATE.PROCESSING]: '处理中',
  [PICTURE_ONLINE_ORDER_STATE.FINISHED]: '已完成',
  [PICTURE_ONLINE_ORDER_STATE.CLOSED]: '已关闭'
}

export interface PictureOnlineOrderInterface {
  base: {},
  id: string | number,
  recordNo: string,
  watchType: WATCH_TYPE,
  state: PICTURE_ONLINE_ORDER_STATE,
  stateCN: string,
  toOffline: boolean,
  productInfos: string[],
  onlyOnlineWatch: boolean,
  storeInfo: { id: string | number, name: string },
  checkerInfo: { id: string | number, name: string },
  userInfo: { name: string, phone: string | number, sculpture: string },
  createAt: string,
  bindAt: string,
  recordLastAt: string,
  deletedAt?: string
}

export default class PictureOnlineOrderModel implements PictureOnlineOrderInterface {
  base = {}
  id = '' // 看片id
  recordNo = '' // 看片订单号
  watchType = WATCH_TYPE.ONLINE // 看片类型
  state = PICTURE_ONLINE_ORDER_STATE.WAIT_FEEDBACK // 看片状态
  stateCN = '' // 看片状态
  toOffline = false // 是否专门店看片
  productInfos = [] // 产品信息
  onlyOnlineWatch = false // 外部订单 选择看片方式
  storeInfo = { id: '', name: '' } // 门店信息
  checkerInfo = { id: '', name: '' } // 审核人信息
  userInfo = { name: '', phone: '', sculpture: '' } // 用户信息
  createAt = '' // 创建时间
  bindAt = '' // 绑定时间
  recordLastAt = '' // 最后一次反馈时间
  deletedAt = '' // 删除时间
  offlineBindAt = '' // 线下绑定时间
  offlineFinishAt = '' // 线下完成时间

  constructor (pictureOnlineOrderData: any) {
    this.base = pictureOnlineOrderData
    this.id = _.get(pictureOnlineOrderData, 'id') || ''
    this.recordNo = _.get(pictureOnlineOrderData, 'record_no') || ''
    this.watchType = _.get(pictureOnlineOrderData, 'watch_type') || ''
    this.state = _.get(pictureOnlineOrderData, 'state') || ''
    this.stateCN = pictureOnlineStateToCN[this.state] || '状态异常'
    this.toOffline = _.get(pictureOnlineOrderData, 'to_offline') || false

    const product_infos = _.get(pictureOnlineOrderData, 'extends.product_infos') || []
    this.productInfos = product_infos.map((item: { name: string }) => item.name)
    this.onlyOnlineWatch = _.get(pictureOnlineOrderData, 'outside_order.extends.only_online_watch') || false

    // 获取门店信息
    const storeInfo = _.get(pictureOnlineOrderData, 'outside_order.extends.store_info') || {}
    this.storeInfo = { id: storeInfo.id, name: storeInfo.name } || '-'

    // 获取看片审核人信息
    const checkerInfo = _.get(pictureOnlineOrderData, 'outside_order.extends.checker_info') || {}
    this.checkerInfo = { id: checkerInfo.id, name: checkerInfo.nickname || checkerInfo.name }

    // 获取用户信息
    const userInfo = _.get(pictureOnlineOrderData, 'outside_order.extends.order_user_info') || {}
    this.userInfo = { name: userInfo.name, phone: userInfo.phone, sculpture: userInfo.head_sculpture }

    this.createAt = pictureOnlineOrderData.created_at || ''
    this.bindAt = pictureOnlineOrderData.bind_at || ''
    this.recordLastAt = pictureOnlineOrderData.record_last_at || ''
    this.deletedAt = pictureOnlineOrderData.deleted_at || ''
    this.offlineBindAt = _.get(pictureOnlineOrderData, 'extends.offline_bind_at') || ''
    this.offlineFinishAt = _.get(pictureOnlineOrderData, 'extends.offline_finish_at') || ''
  }
}
