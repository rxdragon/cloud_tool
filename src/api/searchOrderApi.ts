import axios from '@/plugins/axios'
import SearchOrderModel, { SearchOrderInterface } from '@/model/SearchOrderModel'

export async function searchOrderByNameOrderStream (params: any): Promise<SearchOrderInterface[]> {
  const msg: any = await axios({
    url: '/project_cloud/operator/getStreamList',
    method: 'GET',
    params
  })
  const searchData = msg.list.map((item: any) => {
    const searchOrderDatas = new SearchOrderModel(item)
    const isReceipted = Boolean(_.get(item, 'receipt_at'))
    // 是否加急
    const staticsUrgent = item.tags && item.tags.statics && item.tags.statics.includes('urgent')
    const isReturn = item.state === 'review_return_retouch'
    return {
      ...searchOrderDatas,
      isReceipted,
      staticsUrgent,
      isReturn
    }
  })
  return searchData
}

export async function searchOrderDetailByStream (params: any): Promise<SearchOrderInterface[]> {
  const msg: any = await axios({
    url: '/project_cloud/operator/getStreamInfo',
    method: 'GET',
    params
  })
  const searchData = msg.map((item: any) => {
    const searchOrderDatas = new SearchOrderModel(item)
    
    const isReceipted = Boolean(_.get(item, 'receipt_at'))
    const isReturn = item.state === 'review_return_retouch'
    return {
      ...searchOrderDatas,
      isReceipted,
      isReturn
    }
  })
  return searchData ? searchData[0] : null
}
