/* eslint-disable no-unused-vars */
/**
 * @description 照片状态
 */
export enum PHOTO_STATE {
  /** 待反馈 */
  WAIT_FEEDBACK = 'wait_feedback',
  /** 待处理 */
  SENT = 'sent',
  /** 已更新 */
  UPDATED = 'updated',
  /** 待裁剪 */
  WAIT_CUT = 'wait_cut',
  /** 等待其他照片上传 */
  WAIT_FOR_OTHER_PHOTOS = 'wait_for_other_photos',
  /** 已完成 */
  FINISHED = 'finished'
}

/**
 * @description 看片类型 1为证件 2为签证 3为结婚照
 */
export enum CROP_TEMPLATE {
  /** 证件 */
  CERTIFICATE = 'certificate',
  /** 签证 */
  VISA = 'visa',
  /** 结婚照 */
  MARRY = 'marry',
  NONE = 'none'
}

export const cropTemplateToCN = {
  [CROP_TEMPLATE.CERTIFICATE]: '证件照',
  [CROP_TEMPLATE.VISA]: '签证照',
  [CROP_TEMPLATE.MARRY]: '结婚照',
  [CROP_TEMPLATE.NONE]: '未知'
}


/**
 * @description 订单中文
 */
export const photoStateToCN = {
  [PHOTO_STATE.WAIT_FEEDBACK]: '待反馈',
  [PHOTO_STATE.SENT]: '待处理',
  [PHOTO_STATE.UPDATED]: '已更新',
  [PHOTO_STATE.WAIT_CUT]: '待裁剪',
  [PHOTO_STATE.WAIT_FOR_OTHER_PHOTOS]: '等待其他照片上传',
  [PHOTO_STATE.FINISHED]: '已完成'
}

type retoucherInfoType = {
  id: string | number,
  name: string,
  nickname: string,
  retouch_group: { id: string | number, name: string },
  retoucher_leader: { id: string | number, name: string, nickname: string }
}

type cropInfoType = {
  ratio: string,
  location: string,
  baseWidth: string,
  checkName: string
}

type otherPhotosType = {
  path: string, // 照片路径
  userSelf?: boolean, // 是否自己裁剪
  checkName?: string // 裁切类型
}

export interface PictureOnlinePhotoInterface {
  base: {},
  id: string | number,
  originalPath: string, // 原片地址
  approvedPath: string, // 外部成片地址
  finalPath: string, // 最终成片地址
  updatePath: string // 最新成片
  state: PHOTO_STATE, // 状态
  stateCN: string,
  productInfo: { id: number | string, name: string }, // 产品信息
  trimNote: string, // 摄影备注
  skipCrop: boolean, // 是否跳过裁剪
  retoucherInfo: retoucherInfoType, // 修图信息
  cropTemplate: CROP_TEMPLATE, // 裁剪类型
  cropTemplateCN: string, // 裁切类型
  cropInfo?: cropInfoType, // 裁切信息
  otherPhotos: otherPhotosType[], // 其他成片
  needOtherPhoto: boolean, // 是否需要其他成片
  cloudStreamNum: string | number // 云端流水
}

export default class PictureOnlinePhotoModel implements PictureOnlinePhotoInterface {
  base: {}
  id: string | number
  originalPath: string
  approvedPath: string
  finalPath: string
  updatePath: string
  state: PHOTO_STATE
  stateCN: string
  productInfo: { id: string | number; name: string }
  trimNote: string
  skipCrop: boolean
  retoucherInfo: retoucherInfoType
  cropTemplate: CROP_TEMPLATE
  cropTemplateCN: string
  cropInfo?: cropInfoType
  otherPhotos: otherPhotosType[]
  needOtherPhoto: boolean
  cloudStreamNum: string | number

  constructor (photoData: any) {
    this.base = photoData
    this.id = photoData.id

    this.originalPath = photoData.original_path || ''
    this.approvedPath = photoData.update_path || ''
    this.finalPath = photoData.approved_path || ''
    this.updatePath = photoData.final_path || ''

    this.state = photoData.state || ''
    this.stateCN = photoStateToCN[this.state]

    this.productInfo = _.get(photoData, 'extends.product_info') || { id: '-', name: '-' }
    this.trimNote = _.get(photoData, 'extends.trim_note') || '-'
    this.skipCrop = _.get(photoData, 'extends.skip_crop')
    const retoucherInfo = _.get(photoData, 'extends.retoucher_info')
    if (!retoucherInfo.length) {
      this.retoucherInfo = {
        id: '',
        name: '',
        nickname: '',
        retouch_group: { id: '', name: '' },
        retoucher_leader: { id: '', name: '', nickname: '' }
      }
    } else {
      this.retoucherInfo = _.get(photoData, 'extends.retoucher_info')
    }

    const cropTemplateId = _.get(photoData, 'extends.crop_template_id')

    switch (cropTemplateId) {
      case 1:
        this.cropTemplate = CROP_TEMPLATE.CERTIFICATE
        break
      case 2:
        this.cropTemplate = CROP_TEMPLATE.VISA
        break
      case 3:
        this.cropTemplate = CROP_TEMPLATE.MARRY
        break
      default:
        this.cropTemplate = CROP_TEMPLATE.NONE
        break
    }

    this.cropTemplateCN = cropTemplateToCN[this.cropTemplate]
    this.cropInfo = _.get(photoData, 'extends.crop_info')

    this.otherPhotos = _.get(photoData, 'extends.other_photos') || []
    this.needOtherPhoto = _.get(photoData, 'extends.need_other_photo')
    this.cloudStreamNum = _.get(photoData, 'extends.cloud_stream_num')
  }
}
