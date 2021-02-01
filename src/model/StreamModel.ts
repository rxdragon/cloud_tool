
interface StreamInterface {
  base: any,
  id: string | number,
  exp: number,
  income: number,
  state: string,
  streamNum: string,
  type: string,
  RetoucherId: string | number,
  reworkTimes: number
}

export default class StreamModel implements StreamInterface {
  base = {}
  id = ''
  exp = 0 // 原流水海草值
  income = 0 // 原流水收益
  state = '-' // 流水状态
  streamNum = '-' // 原流水号
  type = '-' // 流水类型
  RetoucherId = '' // 原修图师id

  reworkTimes = 0 // 门店退回次数

  constructor (data: any) {
    console.log(data)
    const streamData = data.origStream
    this.base = data.origStream
    this.id = streamData.Id
    this.exp = streamData.Exp
    this.income = streamData.Income
    this.state = streamData.State
    this.streamNum = streamData.StreamNum
    this.type = streamData.Type
    this.RetoucherId = _.get(streamData, 'RetoucherId.Int32') || '-'

    const reworkPhotoLogs = data.reworkPhotoLogs || []
    this.reworkTimes = reworkPhotoLogs.length
  }
}
