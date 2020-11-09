import axios from '@/plugins/axios'

/**
 * @description 获取待修图流水数量
 */
export async function createUuid (params: any) {
  const msg: any = await axios({
    url: 'https://1414951603043434.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/cloud_tool/dingTalkLogin/save',
    method: 'GET',
    params
  })
  console.log(msg)
  return msg
}

/**
 * @description 获取待修图流水数量
 */
export async function getXstreamId (params: any) {
  const res: any = await axios({
    url: 'https://1414951603043434.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/cloud_tool/dingTalkLogin/get',
    method: 'GET',
    params
  })
  if (res.success) return res.msg
  return ''
}
