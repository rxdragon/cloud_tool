
/**
 * @description 优惠券批次状态
 */
export enum EVENT_TYPE {
  // eslint-disable-next-line no-unused-vars
  QUALITY_PUNISH = 'quality_punish'
}

export const evenTypeToCN = {
  [EVENT_TYPE.QUALITY_PUNISH]: '质量问题',
}

interface PunishLogInterface {
  base: any,
  id: number | string,
  eventType: EVENT_TYPE,
  event: string,
  punishExp: number,
  punishMoney: number,
  punishStaff: string | number,
  streamId: string | number,
  streamNum: string | number
}

export default class PunishLogModel implements PunishLogInterface {
  base = {}
  id = ''
  eventType = EVENT_TYPE.QUALITY_PUNISH
  event = '' // 触发原因
  punishExp = 0 // 扣除海草
  punishMoney = 0 // 扣除金钱
  punishStaff = '' // 扣除伙伴id
  streamId = '' // 被扣流水id
  streamNum = '' // 被扣流水num

  constructor (punishLogData: any) {
    this.base = punishLogData
    this.id = punishLogData.Id
    this.eventType = punishLogData.Event
    this.event = evenTypeToCN[this.eventType]
    this.punishExp = punishLogData.PunishExp
    this.punishMoney = punishLogData.PunishMoney
    this.punishStaff = punishLogData.PunishStaff
    this.streamId = punishLogData.StreamId
    this.streamNum = punishLogData.StreamNum
  }
}
