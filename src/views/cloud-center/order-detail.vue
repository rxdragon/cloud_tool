<template>
  <div class="order-detail">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!loading && orderInfo">
      <v-btn color='primary' @click="goback">返回</v-btn>
      <!-- 照片信息显示区域 -->
      <PhotoDetail :order-info="orderInfo" />

      <!-- 修图要求 -->
      <RetouchNote :order-info="orderInfo" />

      <!-- 照片流 -->
      <PhotoList :order-info="orderInfo" />
    </v-container>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import { Component, Vue } from 'vue-property-decorator'
import PhotoList from './components/PhotoList.vue'
import PhotoDetail from './components/PhotoDetail.vue'
import RetouchNote from './components/RetouchNote.vue'

@Component({
  components: { PhotoDetail, RetouchNote, PhotoList }
})
export default class OrderDetail extends Vue {
  private loading: boolean = false
  private orderInfo: any = null

  /**
   * @description 获取详情信息
   */
  async created () {
    try {
      this.loading = true
      if (!this.$route.query.streamId) {
        this.$message.warning('请重新输入流水号！')
        setTimeout(() => {
          this.$router.push('/cloud-center/cloudOrderQuery')
        }, 700)
        return
      }
      const req: any = {
        streamId: this.$route.query.streamId
      }
      const data = await SearchOrderApi.searchOrderDetailByStream(req)
      if (!data) {
        this.$message.warning('此流水号暂无数据！')
        setTimeout(() => {
          this.$router.push('/cloud-center/cloudOrderQuery')
        }, 700)
        return
      }
      this.orderInfo = data
    } finally {
      this.loading = false
    }
  }

  /**
   * @description 返回搜索页面
   */
  goback () {
    this.$router.push('/cloud-center/cloudOrderQuery')
  }
}
</script>
