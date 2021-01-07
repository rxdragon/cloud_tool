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
    url: '/project_picture_online/my/watchRecord/getWatchRecordsByPhoneWithCode',
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
 * @description 增加在线看片师
 */
type addOnlineWatchersParams = {
  staffIds: string [],
  xid: string
}
export async function addOnlineWatchers (params: addOnlineWatchersParams) {
  await axios({
    url: 'https://cfcf2.run.hzmantu.com/temple/addOnlineWatchers',
    method: 'PUT',
    data: params
  })
}

/**
 * @description 获取照片列表
 */
type getPhotoListByRecordIdParams = {
  recordId: string | number
}
export async function getPhotoListByRecordId (params: getPhotoListByRecordIdParams) {
  const msg: any = await axios({
    url: '/project_picture_online/my/photo/getPhotosByRecordId',
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
export async function checkPictureOnlineOrder (params: any) {
  const msg: any = await axios({
    url: 'https://cfcf2.run.hzmantu.com/project_cloud/temple/checkSendOnline',
    method: 'GET',
    params
  })

  const watchRecordsInfo = _.get(msg, 'onlineStream.watch_records') || []
  const watchRecords = watchRecordsInfo.map((item: any) => {
    return new PictureOnlineOrderModel(item)
  })

  console.log(watchRecords)

  return {
    isOnline: msg.is_online,
    onlineStream: watchRecords,
    cloudStream: msg.cloudStreams,
    errInfo: msg.errInfo
  }
}
