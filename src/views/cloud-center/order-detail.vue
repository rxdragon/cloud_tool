<template>
  <div class="order-detail">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!loading && orderInfo">
      <!-- 照片信息显示区域 -->
      <photo-detail :order-info="orderInfo"></photo-detail>

      <!-- 修图要求 -->
      <retouch-note :order-info="orderInfo"></retouch-note>

      <!-- 照片流 -->
      <photo-list :order-info="orderInfo"></photo-list>
    </v-container>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import { Component, Vue } from 'vue-property-decorator'
import PhotoBox from './components/PhotoBox.vue'
import PhotoList from './components/PhotoList.vue'
import PhotoDetail from './components/PhotoDetail.vue'
import RetouchNote from './components/RetouchNote.vue'

@Component({
  components: { PhotoBox, PhotoDetail, RetouchNote, PhotoList }
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
      // todo 延迟一定时间后返回 前面页面
      this.orderInfo = data
    } finally {
      this.loading = false
    }
  }
}
</script>
