<template>
  <div class="photo-card">
    <v-card :loading="loading" elevation="0">
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            看片师：麦格尼-610033
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            照片数量：4
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            待完成数量：4
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'


@Component
export default class PhotoCard extends Vue {
  @Prop({ type: [String, Number], required: true }) orderId!: string | number

  private loading: boolean = false

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
      await PictureOnlineApi.getPhotoListByRecordId(req)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.photo-card {
  min-height: 400px;
}
</style>
