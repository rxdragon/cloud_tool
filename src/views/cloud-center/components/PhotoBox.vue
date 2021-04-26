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
          <v-container>
            <row>
              <v-col xs="6" sm="6" md="6" lg="4" xl="4" class="photobox" v-for="(versionItem, versionIndex) in photoItem.photoList" :key="versionIndex">
                <v-container class="single-photo">
                  <SinglePhoto :versionItem='versionItem' :photoItem="photoItem" @click.native="showViewer(versionIndex)" />
                  <div class="beneath-photo">
                    <v-btn text class="download-img" @click="downloadImg(versionItem)">下载照片</v-btn>
                    <span class="photo-type">{{ versionItem.title }}</span>
                  </div>
                </v-container>
                <v-divider></v-divider>
              </v-col>
            </row>
          </v-container>
          <ImgPreview
            :viewerVisible.sync="viewerVisible"
            :imgDataList="imgDataList"
            :imgIndex="imgIndex"
            ref="ImgPreview"
          />
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
  @Prop({ type: Object, required: true }) orderInfo!: any
  @Prop({ type: Object, required: true }) photoItem!: any
  @Prop({ type: Number, required: true }) index!: number

  private imgLoading: boolean = true
  private viewerVisible: boolean = false // 子组件中viewer的可见性
  private imgIndex: number = 0 // 图片的索引
  private loading: boolean = false

  get imgDataList (): any[] {
    return this.photoItem.photoList || []
  }

  // 下载图片
  downloadImg (val: { url: any }) {
    window.location.href = `${val.url}?attname=`
  }

  /**
   * @description 图片预览
   */
  showViewer (versionIndex: number) {
    this.imgIndex = versionIndex
    this.viewerVisible = true
  }

}
</script>

<style lang="less" scoped>
.photobox {
  display: inline-block;
  padding: 6px;
  background-color: #f5f7fa;
}

.single-photo{
  padding: 0;
}

.above-photo {
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding:17px 10px 10px 10px;
}

.beneath-photo {
  padding-top: 7px;
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

.iseffects {
  display: flex;
  color: #ff3974;
  font-weight: 400;
  margin-left: auto;
  justify-content: flex-end;
}
</style>
