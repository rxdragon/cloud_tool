<template>
  <div class="photo-item-detail">
    <!-- 概括 -->
    <div class="photo-bulletin">
      <!-- 状态 -->
      <div class="photo-state">
        <v-alert
          height="28"
          dense
          :icon="photoData.needOtherPhoto ? 'mdi-alert' : false"
          :color="photoData.state | filterStateClass"
        >
          <span class="state-box">{{ photoData.stateCN }}</span>
          <span class="product-info">{{ photoData.productInfo.name }}</span>
        </v-alert>
      </div>
      <v-window
        v-model="window"
        class="photo-window"
        show-arrows
      >
        <v-window-item
          eager
          v-for="(photoItem, photoKey) in photoCompressList"
          :key="photoKey"
        >
          <v-img max-height="100%" contain :src="compressDomain + photoItem.path"></v-img>
          <v-alert
            class="photo-version"
            color="#eee"
            height="28"
            dense
          >
            <span class="state-box">{{ photoItem.label }}</span>
          </v-alert>
        </v-window-item>
      </v-window>
      <!-- <v-img :src="compressDomain + photoData.updatePath"></v-img> -->
    </div>
    
    <div :class="{ 'is-visible': showCard }" class="photo-detail">

      <v-icon
        @click="toggleCard"
        :class="{ 'is-rotate': showCard }"
        class="photo-detail-button primary"
      >
        mdi-plus
      </v-icon>

      <div v-show="showCard" class="photo-detail-content">
        <div class="content-img">
          <v-img :src="compressDomain + photoData.updatePath"></v-img>
        </div>
        <div class="content-row">
          <span class="label">产品名字：</span>
          <span class="content">{{ photoData.productInfo.name }} - {{ photoData.productInfo.id }}</span>
        </div>
        <div class="content-row">
          <span class="label">摄影备注：</span>
          <span class="content">{{ photoData.trimNote }}</span>
        </div>
        <div class="content-row">
          <span class="label">跳过裁剪：</span>
          <span class="content" :class="photoData.skipCrop && 'red--text'">{{ photoData.skipCrop ? '是' : '否' }}</span>
        </div>
        <!-- 修图师信息 -->
        <div class="content-row">
          <span class="label">修图师：</span>
          <span class="content">{{ photoData.retoucherInfo.nickname || photoData.retoucherInfo.name || '-' }} - {{ photoData.retoucherInfo.id || '-' }}</span>
        </div>
        <div class="content-row">
          <span class="label">修图组信息：</span>
          <span class="content">
            {{ photoData.retoucherInfo.retouch_group.name || '-' }} -
            {{ photoData.retoucherInfo.retoucher_leader.nickname || photoData.retoucherInfo.retoucher_leader.name || '-' }}
          </span>
        </div>

        <!-- 裁切类型 -->
        <div class="content-row">
          <span class="label">裁剪类型：</span>
          <span class="content">{{ photoData.cropTemplateCN }}</span>
        </div>

        <!-- 裁切信息 -->
        <div class="content-row" v-if="photoData.cropInfo">
          <span class="label">裁剪信息：</span>
          <span class="content">{{ photoData.cropInfo.checkName }}， ratio： {{ photoData.cropInfo.ratio }}， location： {{ photoData.cropInfo.location }}</span>
        </div>

        <!-- 其他成片 -->
        <div class="content-row" v-if="photoData.otherPhotos.length">
          <span class="label">其他成片：</span>
          <ul class="content content-list">
            <li class="path-item" v-for="(item, key) in photoData.otherPhotos" :key="key">
              是否个人裁切：{{ item.userSelf ? '是' : '否' }} 裁切名字：{{ item.checkName }}
              <p @click="toggleImage(key)" class="text-btn">{{ item.path }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card color="#eee">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>预览</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-window
          v-model="window"
          show-arrows
        >
          <v-window-item
            v-for="(photoItem, photoKey) in photoData.otherPhotos"
            :key="photoKey"
          >
            <v-card class="preview-box" color="#eee" height="calc(100vh - 64px)">
              <v-img max-height="100%" contain :src="compressDomain + photoItem.path"></v-img>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SettingModule } from '@/store/modules/setting'
import { PictureOnlinePhotoInterface, PHOTO_STATE } from '@/model/PictureOnlinePhotoModel'

@Component({
  filters: {
    filterStateClass (state: PHOTO_STATE) {
      const changeColor = {
        [PHOTO_STATE.WAIT_FEEDBACK]: '',
        [PHOTO_STATE.SENT]: 'red',
        [PHOTO_STATE.UPDATED]: 'green',
        [PHOTO_STATE.WAIT_CUT]: 'red',
        [PHOTO_STATE.WAIT_FOR_OTHER_PHOTOS]: 'red',
        [PHOTO_STATE.FINISHED]: 'blue'
      }

      return changeColor[state] || ''
    }
  }
})
export default class PhotoItemDetail extends Vue {
  @Prop({ type: [Object], required: true }) photoData!: PictureOnlinePhotoInterface

  private showCard: boolean = false
  private dialog: boolean = false
  private compressDomain: string = SettingModule.compressDomain
  private window: number = 0
  private photoCompressList: { path: string, label: string }[] = []

  created () {
    this.initPhotoList()
  }

  initPhotoList () {
    let photoList = [
      {
        path: this.photoData.finalPath,
        label: '最终成片'
      },
      {
        path: this.photoData.updatePath,
        label: '最新成片'
      },
      {
        path: this.photoData.approvedPath,
        label: '外部成片'
      },
      {
        path: this.photoData.originalPath,
        label: '原片'
      }
    ]
    this.photoCompressList = photoList.filter(item => item.path)
  }

  toggleCard () {
    this.showCard = !this.showCard
  }

  toggleImage (key: number) {
    this.window = key
    this.dialog = true
  }
  
}
</script>

<style lang="less" scoped>
.photo-item-detail {
  @detailBackground: #4669fb;

  position: relative;
  min-height: 200px;

  .photo-bulletin {
    position: relative;
    min-height: 100px;
    transition: all 0.3s;
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 12px;
    overflow: hidden;

    .photo-state {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 12px;
      z-index: 1;
      opacity: 0.9;

      .product-info {
        float: right;
        margin-right: 12px;
        color: #333;
      }

      & /deep/ .v-alert__content {
        font-size: 14px;
        color: #fff;
        margin-top: -2px;
      }

      & /deep/ .v-alert__icon.v-icon {
        font-size: 20px;
        margin-top: -2px;
      }
    }

    .photo-window {
      height: 100%;

      .v-image {
        height: 100%;
      }

      .v-window-item {
        height: 100%;
      }

      .photo-version {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        margin-bottom: 0;
        opacity: 0.9;
      }

      & /deep/ .v-alert__content {
        font-size: 14px;
        margin-top: -8px;
        text-align: center;
      }
    }
  }

  .photo-detail {
    display: flex;
    justify-content:flex-start;
    align-items: flex-start;
    position: absolute;
    z-index: 10;
    top: -15px;
    right: -15px;

    width: 40px;
    height: 40px;
    overflow: hidden;

    border-radius: 50%;
    background: @detailBackground;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    transition: .4s ease;

    .photo-detail-button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      font-size: 24px;
      font-weight: 100;
      color: #fff;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      padding: 7px;
      border-radius: 50%;
      transition: .2s ease;
      cursor: pointer;
    }

    .photo-detail-content{
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow-y: overlay;

      .content-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border-radius: 50%;
        background: #323232;
        margin-bottom: 12px;
        overflow: hidden;
      }

      .content-row {
        width: 100%;
        background: #323232;
        border-radius: 10px;
        margin-bottom: 15px;
        color: #fff;
        padding: 6px 12px;

        .content-list {
          list-style-type: disc;
          list-style-position: outside;
          padding-left: 8px;
        }

        .path-item {
          .text-btn {
            margin: 0;
            color: @detailBackground;
            text-decoration-line: underline;
            cursor: pointer;
          }
        }
      }
    }
  }

  .is-visible {
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    border-radius: 25px;
  }

  .is-rotate {
    transform: rotateZ(135deg);
  }
}
</style>

<style lang="less">
.preview-box {
  height: 100%;
  background-color: red;
}
</style>
