
/**
 * @description 优惠券批次状态
 */
export enum REWORK_PHOTO_TYPE {
  // eslint-disable-next-line no-unused-vars
  QUALITY = 'quality',
  // eslint-disable-next-line no-unused-vars
  NOT_QUALITY = 'not_quality',
  // eslint-disable-next-line no-unused-vars
  BOTH = 'both'
}

export const reworkPhotoTypeToCN = {
  [REWORK_PHOTO_TYPE.QUALITY]: '质量问题',
  [REWORK_PHOTO_TYPE.NOT_QUALITY]: '非质量问题',
  [REWORK_PHOTO_TYPE.BOTH]: '质量问题&非质量问题'
}

interface ReworkPhotoLogInterface {
  base: any,
  isOnline: string,
  newStreamId: number | string,
  newStreamNum: string,
  reworkPhotoType?: REWORK_PHOTO_TYPE,
  reworkPhotoTypeCN: string,
  reworkStreamId: number | string,
  reworkPhotoIds: any[],
  exp: number,
  money: number
}

export default class ReworkPhotoLogModel implements ReworkPhotoLogInterface {
  base = {}
  isOnline = '否' // 是否在线
  newStreamId = '' // 重修新流水id
  newStreamNum = '' // 重修生成流水
  reworkPhotoType = REWORK_PHOTO_TYPE.QUALITY // 重修质量问题
  reworkPhotoTypeCN = '' // 重修质量问题
  reworkStreamId = '' // 重修流水id

  reworkPhotoIds: any[] = [] // 重修照片id
  exp = 0 // 重修扣除海草
  money = 0 // 重修扣除金额

  constructor (reworkPhotoLogData: any) {
    this.base = reworkPhotoLogData

    this.exp = reworkPhotoLogData.Exp
    this.isOnline = Boolean(+reworkPhotoLogData.IsOnline) ? '是' : '否'
    this.money = reworkPhotoLogData.Money
    this.newStreamId = reworkPhotoLogData.NewStreamId
    this.newStreamNum = reworkPhotoLogData.NewStreamNum
    this.reworkPhotoType = reworkPhotoLogData.ReworkPhotoType
    this.reworkPhotoTypeCN = this.reworkPhotoType ? reworkPhotoTypeToCN[this.reworkPhotoType] : ''
    this.reworkStreamId = reworkPhotoLogData.ReworkStreamId
    this.reworkPhotoIds = [reworkPhotoLogData.ReworkPhotoId]
  }

  addExp (exp: number) {
    this.exp += exp
  }

  addMoney (money: number) {
    this.money += money
  }

  addPhotoId (photoId: number | string) {
    this.reworkPhotoIds.push(photoId)
  }
}
