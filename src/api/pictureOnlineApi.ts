import axios from '@/plugins/axios'
import PictureOnlineOrderModel, { PictureOnlineOrderInterface } from '@/model/PictureOnlineOrderModel'

/**
 * @description 获取订单号
 */
type getPictureOnlineByOutsideNoParams = {
  outsideNo: string
}
export async function getPictureOnlineByOutsideNo (params: getPictureOnlineByOutsideNoParams): Promise<PictureOnlineOrderInterface[]> {
  const msg = await axios({
    url: 'https://api-gateway.hzmantu.com/project_picture_online/my/watchRecord/getWatchRecordsByPhoneWithCode',
    method: 'PUT',
    data: params
  })
  const createData = msg.data.map((orderItem: any) => {
    const pictureOnlineOrderData = new PictureOnlineOrderModel(orderItem)
    return {
      ...pictureOnlineOrderData,
      loading: false
    }
  })
  return createData
}
