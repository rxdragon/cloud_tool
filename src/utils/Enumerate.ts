/* eslint-disable no-unused-vars */

/**
 * @description 通知授权状态
 */
export enum NOTIFY_STATUS {
  DEFAULT = 'default', // 询问
  GRANTED = 'granted', // 已授权
  DENIED = 'denied' // 拒绝授权
}

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

/**
 * @description 照片版本
 */
export const PHOTO_VERSION = {
  STORE_REWORK: 'store_rework', // 门店退回的照片version
  ORIGINAL_PHOTO: 'original_photo', // 原片
  FIRST_PHOTO: 'first_photo', // 一次成片
  RETURN_PHOTO: 'return_photo', // 审核退回照片
  RETURN_SHOW: 'return_show', // 退回展示
  COMPLETE_PHOTO: 'complete_photo', // 审核成片
  FINISH_PHOTO: 'finish_photo', // 最终成片
  LAST_RETOUCH_PHOTO: 'last_retouch_photo', // 最新修后成片
}

/**
 * @description 照片版本中文
 */
export const PhotoEnumName = {
  [PHOTO_VERSION.ORIGINAL_PHOTO]: '原片',
  [PHOTO_VERSION.FIRST_PHOTO]: '一次成片',
  [PHOTO_VERSION.RETURN_PHOTO]: '退回照片',
  [PHOTO_VERSION.COMPLETE_PHOTO]: '云端成片',
  [PHOTO_VERSION.STORE_REWORK]: '门店退回',
  [PHOTO_VERSION.FINISH_PHOTO]: '顾客满意片',
  [PHOTO_VERSION.LAST_RETOUCH_PHOTO]: '最新成片'
}

/**
 * 标记枚举
 */
export const STREAM_TAG = {
  STORERETURN: 'store_rework', // 退回标记，可能是退回生成标记
  STORE_RETURNED: 'is_returned', // 被退回
  CHECKRETURN: 'rework',
  CLOUD_EVALUATION: 'cloud_evaluation'
}

/**
 * 抽查类型
 */
export const SPOT_CHECK_MAP = {
  SHOW_PIC_SPOT: 'show_pic_pool',
  CHECK_POOL_SPOT: 'check_pool',
  NOT_SPOT: 'not_spot'
}

/**
 * 抽查类型
 */
export const EVALUATION_TYPE = {
  [SPOT_CHECK_MAP.SHOW_PIC_SPOT]: '修修兽抽查',
  [SPOT_CHECK_MAP.CHECK_POOL_SPOT]: '云学院抽查'
}
