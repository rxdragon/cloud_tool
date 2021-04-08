import axios from '@/plugins/axios'
import SearchOrderModel, { SearchOrderInterface } from '@/model/SearchOrderModel'

/**
 * @description 获取订单号
 */
type searchOrderByOutsideNoParams = {
  outsideNo: string
}
export async function searchOrderByOutsideNo (params: searchOrderByOutsideNoParams): Promise<SearchOrderInterface[]> {
  const msg = await axios({
    url: 'https://api.pre.hzmantu.com/project_cloud/operator/getStreamList',
    method: 'get',
    data: params,
  })
  const createData = msg.data.map((orderItem: any) => {
    const searchOrderData = new SearchOrderModel(orderItem)
    return {
      ...searchOrderData,
      photoList: [],
      loading: false,
      tab: 'order',
    }
  })
  return createData
}
