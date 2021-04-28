import moment from 'moment'

/**
 * @description 拼接时间，用户早8早8
 * @param time 
 * @param addDay 
 */
export function joinTimeSpan (time: any, addDay = 0) {
  const date = moment(time)
  if (addDay) { date.add(1, 'day') }
  return date.format('YYYY/MM/DD 08:00:00')
}


/**
 * @description 等待时间
 * @param {*} time
 */
export function waitTime (time: string | number | Date, passTime: string | number | Date) {
  time = time.toString()
  passTime = passTime.toString()
  const nowTime = new Date().getTime()
  const valueTime = new Date(Date.parse(time.replace(/-/g, "/"))).getTime()
  
  let passAtTime: any
  if (passTime) {
    passAtTime = new Date(Date.parse(passTime.replace(/-/g, "/"))).getTime()
  }
  let differ: any = passTime ? (passAtTime - valueTime) : (nowTime - valueTime)
  differ = (differ / 1000 / 60).toFixed(0) + 'min'
  
  return differ
}
