import axios from '@/plugins/axios'
import { SearchOrderInterface } from '@/model/SearchOrderModel'
import { StreamState } from '@/model/enumerate'
import { waitTime } from '@/utils/timeUtil'

export async function searchOrderByOutsideNo (params: any): Promise<SearchOrderInterface[]> {
  const msg: any = await axios({
    url: '/project_cloud/operator/getStreamList',
    method: 'GET',
    params
  })
  msg.list = msg.list.map((item: any) => {
    const retouchLeader = _.get(item, 'retoucher.retoucher_leader.nickname') ||
      _.get(item, 'retoucher.retoucher_leader.name') || '-'
    if (item.retoucher_org) {
      item.retoucherOrgName = _.get(item, 'retoucher_org.name', '-')
      item.retoucherOrgRetouchName = _.get(item, 'tags.values.retoucher_name', '-')
    }
    const isReceipted = Boolean(_.get(item, 'receipt_at'))
    const retouchTime = waitTime(item.receipt_at, item.pass_at)
    const photographerOrgName = _.get(item, 'order.photographer_org.name') || '-'

    return Object.assign({}, item, {
      staticsUrgent: item.tags && item.tags.statics && item.tags.statics.includes('urgent'),
      isReturn: item.state === 'review_return_retouch',
      retoucherName: _.get(item, 'retoucher.name') || _.get(item, 'retoucher.real_name') || '-',
      retouchLeader,
      retouchType: item.product && item.product.retouch_standard,
      reviewerName: _.get(item, 'reviewer.name') || _.get(item, 'reviewer.real_name') || '-',
      waitTime: waitTime(item.created_at, item.pass_at),
      streamState: StreamState[item.state] || item.state,
      photoNum: item.photos.filter((item: any) => +item.people_num > 0).length,
      isReceipted,
      retouchTime,
      photographerOrgName
    })
  })
  return msg.list
}
