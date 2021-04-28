<template>
  <div class="photo-box">
    <v-row>
      <v-col>
        <v-card elevation="0">
          <div class="above-photo">
            <span>｜</span>
            {{ '照片  ' + (index + 1) }}
            <span class="iseffects">{{ photoItem.special_efficacy }}</span>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12" xs="12" sm="6" md="6" lg="4" xl="3" class="photo-version-list" v-for="(versionItem, versionIndex) in photoItem.photoList" :key="versionIndex">
                <v-container class="photo-version-item">
                  <SinglePhoto :versionItem='versionItem' :photoItem="photoItem" @click.native="showViewer(versionIndex)" />
                  <div class="beneath-photo">
                    <v-btn text class="download-img" @click="downloadImg(versionItem)">下载照片</v-btn>
                    <span class="photo-type">{{ versionItem.title }}</span>
                  </div>
                </v-container>
              </v-col>
            </v-row>
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
.photo-version-list {
  display: inline-block;
}

.photo-version-item {
  padding: 0;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}

.above-photo {
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding:17px 10px 10px 10px;
}

.beneath-photo {
  display: flex;
  background-color: #fff;
  padding-top: 7px;
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
