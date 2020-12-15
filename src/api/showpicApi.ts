import axios from '@/plugins/axios'
import moment from 'moment'

export function getSaleInfo () {
  const params = {
    text: {
      content: '修修兽日趋势'
    },
    type: 'json'
  }
  return axios({
    url: 'https://cf.run.hzmantu.com/asd',
    method: 'POST',
    data: params,
    transformRequest: [function (data, headers) {
      delete headers['x-stream-id']
      return JSON.stringify(data)
    }],
  }).then((msg: any) => {
    const { paidFeeGroupByDays } = msg
    const neer7Days: any[] = []
    let monthInfo: { month: any; sum: any }[] = []
    paidFeeGroupByDays.forEach((dayItem: any, dayIndex: number) => {
      dayItem.sum = Number(dayItem.Sum)
      dayItem.month = moment(dayItem.Day).get('month') + 1
      dayItem.day = moment(dayItem.Day).get('date')
      // 过去近7天数据
      if (paidFeeGroupByDays.length - dayIndex < 8) {
        neer7Days.push(dayItem)
      }
      // 获取月相关数据
      const findMonth = monthInfo.find(item => item.month === dayItem.month)
      if (findMonth) {
        findMonth.sum = (findMonth.sum * 100 + dayItem.sum * 100) / 100
      } else {
        monthInfo.push({
          month: dayItem.month,
          sum: dayItem.sum
        })
      }
    })
    monthInfo = monthInfo.slice(monthInfo.length - 7)
    const createData = {
      neer7Days,
      monthInfo
    }
    return createData
  })
}
