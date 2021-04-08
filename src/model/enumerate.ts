// 流水状态
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

// 流水中文状态
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
