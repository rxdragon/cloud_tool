import axios from '@/plugins/axios'
import StreamModel from '@/model/StreamModel'
import ReworkPhotoLogModel from '@/model/ReworkPhotoLogModel'
import PunishLogModel from '@/model/PunishLogModel'

/**
 * @description 获取订单列表
 */
export function getOrderList (params: any) {
  const req = {
    "text": {
      "content": `查退单，${params}`
    },
    "type": "json"
  }
  return axios({
    url: '',
    method: 'POST',
    data: req
  }).then((res: any) => {
    const origStreamInfo = { ...new StreamModel(res) }
    // 处理惩罚记录
    const punishLogs = _.get(res, 'punishLogs') || []
    const sortPunishLogs = punishLogs.sort((a: { Id: number }, b: { Id: number }) => a.Id - b.Id)
    const punishLogsInfo = sortPunishLogs.map((item: { index: any }, index: any) => {
      item.index = index
      return { ...new PunishLogModel(item) }
    })
    // 处理流水纬度退回数据
    const reworkTimeInfo: ReworkPhotoLogModel[] = []
    const sortPhotoLogs = res.reworkPhotoLogs.sort((a: { Id: number }, b: { Id: number }) => a.Id - b.Id)
    sortPhotoLogs.forEach((photoLogItem: { index: any; NewStreamNum: any; Exp: any; Money: any; ReworkPhotoId: any }, photoLogIndex: any) => {
      photoLogItem.index = photoLogIndex
      const findReworkItem = reworkTimeInfo.find(item => item.newStreamNum === photoLogItem.NewStreamNum)
      if (findReworkItem) {
        findReworkItem.addExp(photoLogItem.Exp)
        findReworkItem.addMoney(photoLogItem.Money)
        findReworkItem.addPhotoId(photoLogItem.ReworkPhotoId)
      } else {
        const createCountInfo = new ReworkPhotoLogModel(photoLogItem)
        reworkTimeInfo.push(createCountInfo)
      }
    })
    
    // 退回张数退回问题
    const photoLogInfo: any = {}
    sortPhotoLogs.forEach((photoLogItem: { ReworkPhotoId: string | number }) => {
      const findPhotoItem = photoLogInfo[photoLogItem.ReworkPhotoId]
      if (!findPhotoItem) { photoLogInfo[photoLogItem.ReworkPhotoId] = [] }
      photoLogInfo[photoLogItem.ReworkPhotoId].push(photoLogItem)
    })
    return [
      {
        ...origStreamInfo,
        punishLogsInfo,
        reworkTimeInfo,
        photoLogInfo
      }
    ]
  })
}
