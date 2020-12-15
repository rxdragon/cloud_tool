import moment from 'moment'

/**
 * @description 拼接时间，用户早8早8
 * @param time 
 * @param addDay 
 */
export function joinTimeSpan (time: any, addDay = 0) {
  const date = moment(time)
  if (addDay) { date.add(1, 'day') }
  return date.format('YYYY-MM-DD 08:00:00')
}
