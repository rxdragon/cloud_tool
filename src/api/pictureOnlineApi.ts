import axios from '@/plugins/axios'
import PictureOnlineOrderModel, { PictureOnlineOrderInterface } from '@/model/PictureOnlineOrderModel'
import PictureOnlinePhotoModel, { PictureOnlinePhotoInterface, PHOTO_STATE } from '@/model/PictureOnlinePhotoModel'

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
      photoList: [],
      loading: false,
      tab: 'order'
    }
  })
  return createData
}

/**
 * @description 获取照片列表
 */
type getPhotoListByRecordIdParams = {
  recordId: string | number
}
export async function getPhotoListByRecordId (params: getPhotoListByRecordIdParams) {
  const msg: any = await axios({
    url: 'https://api-gateway.hzmantu.com/project_picture_online/my/photo/getPhotosByRecordId',
    method: 'GET',
    params
  })

  const photos = msg.photos || []
  const photoList: PictureOnlinePhotoInterface[] = photos.map((photoItem: any) => {
    return new PictureOnlinePhotoModel(photoItem)
  })

  const watcherInfo = {
    name: _.get(msg, 'watcher_info.nickname') || _.get(msg, 'watcher_info.name') || '-',
    watchId: _.get(msg, 'watcher_info.id') || '-'
  }
  
  const photoUnFinishedCount = photoList.reduce((acc: number, photoItem: PictureOnlinePhotoInterface) => {
    if (photoItem.state !== PHOTO_STATE.FINISHED) {
      acc += 1
    }
    return acc
  }, 0)

  return {
    photoList,
    watcherInfo,
    photoCount: photoList.length,
    photoUnFinishedCount
  }
}

/**
 * @description 查询是否支持在线看片
 * @param params 
 */
export async function checkPictureOnlineOrder (orderId: string | number) {
  const params = {
    "params": {
      SENDER_ID: "$:LWCP_v1:$M7Nc865b9IPyLsltLre4INiUX+v0/Nln",
      SENDER_NICK: "泰德",
      IS_ADMIN: "false",
      SENDER_STAFF_ID: "232334545924185126",
      MEMBER_TYPE: "",
      TOKEN: "",
      FROM: "single_chat",
      FROM_SITE: "cidEZpUzyTAaE/64BG4nz7V33y/7ZGRO+7TbJCwClmSHCQ="
    },
    content: `检查在线看片${orderId}`
  }

  const msg: any = await axios({
    url: 'https://cf3.run.hzmantu.com/',
    method: 'POST',
    data: params
  })
  console.log(msg)
}
