<template>
  <div class="photo-card">
    <v-card :loading="loading" elevation="0">
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">看片师：</span>
            <span class="content">{{ watcherInfo.name }}-{{ watcherInfo.watchId }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">照片数量：</span>
            <span class="content">{{ photoCount }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">待完成数量：</span>
            <span class="content">{{ photoUnFinishedCount }}</span>
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <v-row class="mx-0">
          <v-col v-for="photoItem in photoList" :key="photoItem.id" cols="12" sm="6" md="4" lg="4" xl="4">
            <photo-item-detail :photo-data="photoItem" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PictureOnlinePhotoInterface } from '@/model/PictureOnlinePhotoModel'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'
import PhotoItemDetail from './PhotoItemDetail.vue'

@Component({
  components: { PhotoItemDetail }
})
export default class PhotoCard extends Vue {
  @Prop({ type: [String, Number], required: true }) orderId!: string | number

  private loading: boolean = false
  private watcherInfo: { watchId: number | string, name: string } = { watchId: '-', name: '-' }
  private photoCount: number = 0
  private photoUnFinishedCount: number = 0
  private photoList: PictureOnlinePhotoInterface[] = []

  created () {
    this.getPhotoList()
  }

  /**
   * @description 获取照片列表
   */
  async getPhotoList () {
    try {
      this.loading = true
      const req = { recordId: this.orderId }
      const res = await PictureOnlineApi.getPhotoListByRecordId(req)
      this.watcherInfo = res.watcherInfo
      this.photoUnFinishedCount = res.photoUnFinishedCount
      this.photoCount = res.photoCount
      this.photoList = res.photoList
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.photo-card {
  min-height: 400px;

  .label {
    display: inline-block;
    width: 85px;
  }
}
</style>
