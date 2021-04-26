<template>
  <div class="single-photo">
    <v-avatar class="photo" tile size="100%">
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
