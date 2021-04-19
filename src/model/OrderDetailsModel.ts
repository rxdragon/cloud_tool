/* eslint-disable no-unused-vars */

import { waitTime } from "@/utils/timeUtil"
import { RetouchStandard, StreamState, RetouchOrder, PhotoEnumName } from '@/utils/Enumerate'
import { SettingModule } from "@/store/modules/setting"

export interface OrderDetailInterface {
  base: {},
  queueIndexs: string | number
  retouchStandards: string
  orderInfos: {
    externalNum: string
    streamNum: string
    producName: string
    photoCount: string | number
  }
  retouchClaims: { eye: string, face: string, pimples: boolean }
  storeNames: string
  photographers: string
  orderNotes: string
  photoStreams: any

  retouchRemark: string
  referencePhoto: string
  backgroundColor: string
  photographyNote: string
  dresserNote: string
  orderNote: string
  reviewerNote: string

  isGreen: boolean
  isChristmasPhoto: boolean

  retouchers: { retoucher: string; retoucherLeader: string; OrgName: string }
  reviewers: string
  photographerOrgNames: string
  retouchTimes: string
  waitTimes: string
  states: string
}

export default class OrderDetailModel implements OrderDetailInterface {
  base = {}
  queueIndexs = '' // 订单在队列中的位置
  retouchStandards = '' // 修图标准
  orderInfos = { externalNum: '', streamNum: '', producName: '', photoCount: '' } // 订单信息
  retouchers = { retoucher: '', retoucherLeader: '', OrgName: '' } // 修图师信息
  retouchClaims = { eye: '', face: '', pimples: false } // 修图要求
  storeNames = '' // 门店
  photographers = '' // 摄影师
  orderNotes = '' // 修图要求
  photoStreams = '' // 照片流
  reviewers = '' // 审核人
  photographerOrgNames = '' // 摄影机构
  retouchTimes = '' // 修图时间
  waitTimes = '' // 等待时间
  states = '' // 当前状态

  retouchRemark = '' // 修图备注
  referencePhoto = '' // 参考图
  backgroundColor = '' // 背景备注
  photographyNote = '' // 摄影备注
  dresserNote = '' // 化妆备注
  orderNote = '' // 订单备注
  reviewerNote = '' // 审核备注

  requireLabel = {} // 修图要求
  isGreen = false // 是否是绿色通道

  isChristmasPhoto = false
  
  get imgCompressDomain () {
    return SettingModule.compressDomain
  }
  constructor (orderDetailData: any) {
    if (!orderDetailData) return
    this.base = orderDetailData
    this.getNote()
    const retouchRequire = {
      eye: '暂无',
      face: '暂无',
      pimples: false
    }
    // 获取位置和修图标准信息
    this.queueIndexs = _.get(orderDetailData, 'queue_index') || '-'
    this.retouchStandards = RetouchStandard[_.get(orderDetailData, 'product.retouch_standard')] || '-'

    // 获取订单信息
    this.orderInfos.externalNum = (orderDetailData.order && _.get(orderDetailData, 'order.external_num')) || '-'
    this.orderInfos.streamNum = orderDetailData.stream_num || '-'
    this.orderInfos.producName = _.get(orderDetailData, 'product.name') || '-'
    this.orderInfos.photoCount = orderDetailData.photos.filter((item: any) => +item.people_num > 0).length || '-'

    // 修图要求
    this.retouchClaims.eye = RetouchOrder[_.get(orderDetailData, 'tags.values.retouch_claim.eye')] || '-'
    this.retouchClaims.face = RetouchOrder[_.get(orderDetailData, 'tags.values.retouch_claim.face')] || '-'
    this.retouchClaims.pimples = _.get(orderDetailData, 'tags.values.retouch_claim.pimples') || '-'

    // 判断是否是圣诞一人成团订单
    this.isChristmasPhoto = _.get(orderDetailData, 'tags.values.need_auto_created_finish_photo') || false

    const referencePhoto = _.get(orderDetailData, 'tags.values.retouch_claim.referenceImg')
    this.referencePhoto = referencePhoto ? process.env.VUE_APP_DOMAIN + referencePhoto : ''
    
    this.isGreen = _.get(orderDetailData, 'tags.statics', []).includes('green_stream')
    this.requireLabel = _.get(orderDetailData, 'tags.values.retouch_claim') || retouchRequire
    this.reviewerNote = _.get(orderDetailData, 'reviewer_note') || '-'
    this.photographers = _.get(orderDetailData, 'order.tags.values.photographer') || '-'
    this.storeNames = _.get(orderDetailData, 'order.tags.values.store_name') || '-'
    this.orderNotes = _.get(orderDetailData, 'note.retouch_note') || _.get(orderDetailData, 'order.note.orderNote') || '-'

    // 处理照片流信息
    this.photoStreams = orderDetailData.photos.map((item: any) => {
      const special_efficacy = _.get(item, 'tags.values.special_efficacy') || '-'
      const origin_photo_path = _.get(item, 'tags.values.origin_photo_path') || _.get(item, 'other_photo_version[0].path') || '-'
      const photoVersion = item.other_photo_version.map((item: any) => {
        const version = PhotoEnumName[item.version]
        const versionPath = item.path
        return {
          version,
          versionPath
        }
      })
      const photoList = item.other_photo_version.map((item: any, index: any) => {
        const title = PhotoEnumName[item.version]
        const url = `${this.imgCompressDomain}${item.path}`
        const id = index
        return { title, url, id }
      })
      return {
        photoVersion,
        photoList,
        special_efficacy,
        origin_photo_path
      }
    })
    
    // 获取修图师和组长和机构信息
    this.retouchers.retoucher = _.get(orderDetailData, 'retoucher.name') || _.get(orderDetailData, 'retoucher.real_name') ||
    _.get(orderDetailData, 'tags.values.retoucher_name') || '-'
    this.retouchers.retoucherLeader = _.get(orderDetailData, 'retoucher.retoucher_leader.nickname') || _.get(orderDetailData, 'retoucher.retoucher_leader.name') || '-'
    this.retouchers.OrgName = _.get(orderDetailData, 'retoucher_org.name') || '-'

    // 获取审核人和摄影机构信息
    this.reviewers = _.get(orderDetailData, 'reviewer.name') || _.get(orderDetailData, 'reviewer.real_name') || '-'
    this.photographerOrgNames = _.get(orderDetailData, 'order.photographer_org.name') || '-'

    // 获取修图和等待时间信息
    this.retouchTimes = waitTime(orderDetailData.receipt_at, orderDetailData.pass_at) || '-'
    this.waitTimes = waitTime(orderDetailData.created_at, orderDetailData.pass_at) || '-'
    
    // 获取当前状态信息
    this.states = StreamState[orderDetailData.state] || '-'
  }

  // 获取日志相关
  getNote () {
    this.retouchRemark = _.get(this.base, 'note.retouch_note') || '-' // 修图备注
    this.backgroundColor = _.get(this.base, 'note.color_note') || '' // 背景备注
    this.photographyNote = _.get(this.base, 'note.photography_note') || '-' // 摄影备注
    this.dresserNote = _.get(this.base, 'order.note.dresserNote') || '-' // 化妆备注
    this.orderNote = _.get(this.base, 'order.note.orderNote') || '-' // 订单备注
  }
}
