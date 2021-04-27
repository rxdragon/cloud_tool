/* eslint-disable no-unused-vars */
export interface ProductDetailInterface {
  base: {}
  checkOrder: string
  reasonAnalyze: { productDetail: any; pointAt: string; receive: string; orderState: string }
  record: any
}

export default class ProductDetailModel implements ProductDetailInterface {
  base = {}
  checkOrder = '' // 检查接单
  reasonAnalyze = { productDetail: [], pointAt: '', receive: '', orderState: '' } // 产品详情 指派 接单 订单状态
  record = {} // 操作记录
  constructor (searchOrderData: any) {
    this.base = searchOrderData
    this.checkOrder = searchOrderData['检查接单']
    this.reasonAnalyze.productDetail = _.get(searchOrderData, '订单状态分析.分析原因.产品详情').map((item: any) => {
      const productState = item['产品状态'] || '-'
      const operationRecord = item['操作记录'] || '-'
      const streamRecord = item['流水记录'] || '-'
      return {
        productState,
        operationRecord,
        streamRecord,
      }
    })

    /**
     * 增加了对数据不存在时的校验，提高了前端视图的稳定性 
     */
    if (!_.get(searchOrderData, '订单状态分析.分析原因.产品详情')) {
      this.record = () => {
        const operationRecord = () => {
          const recordState = '-'
          const recordTime = '-'
          return {
            recordState,
            recordTime,
          }
        }
        const streamRecord = () => {
          const recordState = '-'
          const recordTime = '-'
          return {
            recordState,
            recordTime,
          }
        }
        return {
          operationRecord,
          streamRecord,
        }
      }
    }
    else {
      const productInfo = _.get(searchOrderData, '订单状态分析.分析原因.产品详情') || []
      this.record = productInfo.map((item: any) => {
        let operationRecord: any = null

        if (item['操作记录']) {
          operationRecord = item['操作记录'].map((item: any) => {
            const recordState = item.split(/:\s+?/)[0].replace(/\[[^\[\]\n]*\]/, '') || '-'
            const recordTime = item.replace(recordState, '').replace(/:+?/, '')
            let color = 'primary'
            if (recordState.indexOf('中') !== -1){
              color = 'red'
            }
            else if (recordState.indexOf('待') !== -1) {
              color = 'yellow'
            }
            return {
              recordState,
              recordTime,
              color
            }
          })
        }

        let streamRecord: any = null
        if (item['流水记录']) {
          streamRecord = item['流水记录'].map((item: any) => {
            const recordState = item.split(/(\([^\)]*\))/)[0] || '-'
            const recordTime = item.replace(recordState, '')
            let color = 'primary'
            if (recordState.indexOf('中') !== -1){
              color = 'red'
            }
            else if (recordState.indexOf('待') !== -1) {
              color = 'yellow'
            }
            return {
              recordState,
              recordTime,
              color
            }
          })
        }
        
        return {
          operationRecord,
          streamRecord
        }
      })
    }
    
    this.reasonAnalyze.pointAt = _.get(searchOrderData, '订单状态分析.分析原因.指派') || '-'
    this.reasonAnalyze.receive = _.get(searchOrderData, '订单状态分析.分析原因.接单') || '-'
    this.reasonAnalyze.orderState = _.get(searchOrderData, '订单状态分析.分析原因.订单状态') || '-'
  }
}
