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
            <single-photo :versionItem='versionItem' :location='key' :photoItem="photoItem" @showViewer="showViewer"></single-photo>
          </div>
          <img-preview
            :viewerVisible.sync="viewerVisible"
            :imgDataList.sync="imgDataList"
            :imgIndex.sync="imgIndex"
            ref="ImgPreview"
          ></img-preview>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SinglePhoto from './SinglePhoto.vue'
import ImgPreview from '@/components/ImgPreview/ImgPreview.vue'

@Component({
  components: { SinglePhoto, ImgPreview },
})
export default class PhotoBox extends Vue {
  private imgLoading: boolean = true
  private viewerVisible: boolean = false // 子组件中viewer的可见性
  private imgIndex: number = 100 // 图片的索引
  private imgDataList: any[] = [] // 得到的img的数据
  private loading: boolean = false

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
   * @description 图片预览
   */
  showViewer (key: number) {
    this.imgIndex = key
    setTimeout(() => {
      this.viewerVisible = true;
      if (this.$refs.ImgPreview as any)
        (this.$refs.ImgPreview as any).init(this.imgIndex)
    }, 120)
  }

}
</script>

<style lang="less" scoped>
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

.iseffects {
  display: flex;
  color: #ff3974;
  font-weight: 400;
  margin-left: auto;
  justify-content: flex-end;
}
</style>
