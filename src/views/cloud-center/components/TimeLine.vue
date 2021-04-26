<template>
  <div class="time-line">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="timeline" v-if="!loading && orderInfo">
      <!-- 照片信息显示区域 -->
      <ProductDetail :order-info="orderInfo" />

      <!-- 修图要求 -->
      <ProductList :order-info="orderInfo" />
    </v-container>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import { Component, Vue, Prop } from 'vue-property-decorator'
import ProductDetail from './ProductDetail.vue'
import ProductList from './ProductList.vue'

@Component({
  components: { ProductDetail, ProductList }
})
export default class TimeLine extends Vue {
  private loading: boolean = false
  private orderInfo: any = null
  @Prop({ type: String, required: true }) seachOrder!: string

  /**
   * @description 获取详情信息
   */
  async created () {
    try {
      this.loading = true
      if (!this.seachOrder) {
        this.$message.warning('请重新输入订单号！')
        return
      }
      const req: any = {
        orderNo: this.seachOrder
      }
      const data = await SearchOrderApi.searchOrderTimeLineByOrderNo(req)
      if (!data) {
        this.$message.warning('此流水号暂无数据！')
        return
      }
      this.orderInfo = data
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.timeline{
  padding: 0;
}
</style>
