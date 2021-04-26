/* eslint-disable no-unused-vars */
export interface ProductDetailInterface {
  base: {},
  checkOrder: string,
  reasonAnalyze: { productDetail: any, pointAt: string, receive: string, orderState: string }
  record: any
}

export default class ProductDetailModel implements ProductDetailInterface {
  base = {}
  checkOrder = '' // 检查接单
  reasonAnalyze = { productDetail: [], pointAt: '', receive: '', orderState: '' } // 产品详情 指派 接单 订单状态
  record = [] // 操作记录
  constructor (searchOrderData: any) {
    this.base = searchOrderData
    this.checkOrder = searchOrderData.检查接单
    this.reasonAnalyze.productDetail = _.get(searchOrderData, '订单状态分析.分析原因.产品详情').map((item: any) => {
      const productState = item.产品状态 || '-'
      const operationRecord = item.操作记录 || '-'
      const streamRecord = item.流水记录 || '-'
      return {
        productState,
        operationRecord,
        streamRecord
      }
    })

    this.record = _.get(searchOrderData, '订单状态分析.分析原因.产品详情').map((item: any) => {
      const operationRecord = item.操作记录.map((item: any) => {
        const recordState = item.split(/:\s+?/)[0].replace(/\[[^\[\]\n]*\]/, '') || '-'
        const recordTime = item.replace(recordState, '').replace(/:+?/, '')
        return {
          recordState,
          recordTime
        }
      })
      const streamRecord = item.流水记录.map((item: any) => {
        const recordState = item.split(/(\([^\)]*\))/)[0] || '-'
        const recordTime = item.replace(recordState, '')
        return {
          recordState,
          recordTime
        }
      })
      return {
        operationRecord,
        streamRecord
      }
    })
    this.reasonAnalyze.pointAt = _.get(searchOrderData, '订单状态分析.分析原因.指派') || '-'
    this.reasonAnalyze.receive = _.get(searchOrderData, '订单状态分析.分析原因.接单') || '-'
    this.reasonAnalyze.orderState = _.get(searchOrderData, '订单状态分析.分析原因.订单状态') || '-'
  }
}
