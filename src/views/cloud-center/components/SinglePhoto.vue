<template>
  <div class="single-photo">
    <div class="image-box" tile>
      <v-img
        class="image-content"
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
.single-photo {
  background-color: #f5f7fa;
}

.image-box {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 4px;

  .image-content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
