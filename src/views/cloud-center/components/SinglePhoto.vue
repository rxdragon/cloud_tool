<template>
  <div class="single-photo">
    <div>
      <v-avatar class="photo" tile size="243" height="253">
        <v-img
          contain
          :src="versionItem.url"
          :lazy-src="versionItem.url"
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
})
export default class SinglePhoto extends Vue {
  private imgLoading: boolean = true
  @Prop({ type: Object, required: true }) versionItem!: any
  @Prop({ type: Object, required: true }) photoItem!: any

  downloadImg (val: { url: any }) {
    window.location.href = `${val.url}?attname=`
  }

  /**
   * @description 图片加载成功
   */
  onLoadImageSuccess () {
    this.imgLoading = false
  }

  /**
   * @description 图片加载失败
   */
  onLoadImageError () {
    this.imgLoading = true
  }
}
</script>

<style lang="less" scoped>
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

.photo-type {
  display: flex;
  padding: 9.5px 6px 0 0;
  margin-left: auto;
  justify-content: flex-end;
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
