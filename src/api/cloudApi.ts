import axios from '@/plugins/axios'

/**
 * @description 获取待修图流水数量
 */
export async function getQueueLength () {
  const msg: any = await axios({
    url: 'https://api-gateway.hzmantu.com/project_cloud/temple/getQueueLength?queueName=waitRetouchStreamQueue',
    method: 'GET'
  })
  return msg[0].waitRetouchStreamQueueLength || 0
}

/**
 * @description 获取排队流水数量
 */
export async function getRetoucherQueueLength () {
  const msg: any = await axios({
    url: 'https://api-gateway.hzmantu.com/project_cloud/temple/getQueueLength?queueName=retoucherQueue',
    method: 'GET'
  })
  return msg[0].retoucherQueueLength || 0
}
