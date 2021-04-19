<template>
  <div class="photo-box">
    <v-row>
      <v-col>
        <v-card>
          <div class="above-photo">
            <span>｜</span>
            {{ '照片  ' + (index + 1) }}
            <span class="iseffects">{{ photoItem.special_efficacy }}</span>
          </div>
          <div class="photobox" v-for="(versionItem, key) in photoItem.photoList" :key="key">
            <div class="img-box" :class="{ 'image-load': loading }">
              <v-avatar class="photo" tile size="243" height="253">
                <v-img
                  contain
                  :src="versionItem.url"
                  :lazy-src="versionItem.url"
                  @click="showViewer(key)"
                  @load="onLoadImageSuccess"
                  @error="onLoadImageError"
                >
                  <template v-slot:default>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular v-show="imgLoading" indeterminate color="primary lighten-5"></v-progress-circular>
                      <div v-show="imgLoading" slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" />
                        <span class="image-error-tip">加载失败...</span>
                        <v-btn text class="debug-network-button">诊断网络</v-btn>
                      </div>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </div>
            <div class="beneath-photo">
              <v-btn text class="download-img" @click="downloadImg(versionItem)">下载照片</v-btn>
              <span class="photo-type">{{ versionItem.title }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <img-preview
      :viewerVisible.sync="viewerVisible"
      :imgDataList.sync="imgDataList"
      :imgIndex.sync="imgIndex"
      ref="ImgPreview"
    ></img-preview>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ImgPreview from '@/components/ImgPreview/ImgPreview.vue'

@Component({
  components: { ImgPreview },
})
export default class PhotoBox extends Vue {
  private breviary: string = '!thumb.small.50'
  private imgLoading: boolean = true
  private errorReplaceUrl: any = '' // 重新加载图片
  private linkTag: any = null
  private limitSize: any = 20 * 1024 * 1024
  private loading: boolean = false
  private errorCount: number = 0
  private viewerVisible: boolean = false; // 子组件中viewer的可见性
  private imgIndex: number = 100; // 图片的索引
  private imgDataList: any[] = []; // 得到的img的数据

  @Prop({ type: Object, required: true }) orderInfo!: any
  @Prop({ type: Object, required: true }) photoItem!: any
  @Prop({ type: Number, required: true }) index!: number

  created () {
    this.imgDataList = this.photoItem.photoList
  }

  downloadImg (val: { url: any }) {
    window.location.href = `${val.url}?attname=`
  }

  /**
   * @description 图片加载成功
   */
  onLoadImageSuccess () {
    this.loading = false
    this.imgLoading = false
  }

  /**
   * @description 图片加载失败
   */
  onLoadImageError () {
    this.loading = false
    this.imgLoading = true
  }

  /**
   * @description 图片预览
   */
  showViewer (key: number) {
    this.imgIndex = key
    setTimeout(() => {
      this.viewerVisible = true;
      (this.$refs.ImgPreview as any).init(this.imgIndex)
    }, 0)
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/variables.less';
.img-box {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 4px;

  &.image-load {
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      margin: -16px 0 0 -16px;
      font-family: @elementIcons !important;
      font-size: 32px;
      color: #606266;
      content: '\e6cf';
      animation: rotating 2s linear infinite;
    }

    .image-loading-model {
      width: 100%;
      padding-bottom: 100%;
      background-color: #f1f1f1;
    }
  }

  .joint-label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20px;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    color: @red;
    background-color: #eee;
    opacity: 0.8;
  }

  .photo-name {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    word-break: break-all;
    background: @gradualTransparent;
  }

  .lekima-tag {
    position: absolute;
    top: 0;
    left: 0;
    width: 56px;
    height: 24px;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    color: #fff;
    text-align: center;
    background: linear-gradient(51deg, rgb(255, 126, 0) 0%, rgb(255, 0, 0) 100%);
    border-radius: 0 0 6px 0;
  }

  .photo-tags {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;

    .tag {
      display: inline-block;
      width: max-content;
      padding: 3px 6px;
      font-size: 10px;
      font-weight: 600;
      color: #fff;
      border-radius: 0 8px 0 0;

      &.red-tag {
        background: @red;
      }

      &.warning-tag {
        background: @orange;
      }

      &.gray-tag {
        background: @gray;
      }

      &.blue-tag {
        background: @sky-blue;
      }

      &.green-tag {
        background: @green;
      }
    }
  }

  .el-image {
    position: absolute;
    width: 100%;
    height: 100%;

    img {
      -webkit-user-select: none;
      -webkit-user-drag: none;
      user-select: none;
      object-position: top;
    }
  }

  .show-center {
    img {
      user-select: none;
      -webkit-user-drag: none;
      object-position: center;
    }
  }

  .image-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 30px;
    color: #909399;
    background-color: #f5f7fa;

    .image-error-tip {
      margin-top: 20px;
      font-size: 16px;
    }

    .debug-network-button {
      font-size: 12px;
      color: #ff3974;
    }
  }

  .orgin-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
}

.photobox {
  display: inline-block;
  width: 253px;
  margin: 0 15px 15px 15px;
  padding: 5px;
  background-color: #f5f7fa;
}

.above-photo {
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 10px 10px;
}

.beneath-photo {
  display: flex;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
}

.iseffects {
  display: flex;
  color: #ff3974;
  font-weight: 400;
  margin-left: auto;
  justify-content: end;
}

.photo-type {
  display: flex;
  padding: 9.5px 6px 0 0;
  margin-left: auto;
  justify-content: end;
}

/deep/ .v-btn:not(.v-btn--round).v-size--default {
  padding: 0 0;
}

.download-img {
  color: #4669fb;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
}
</style>
