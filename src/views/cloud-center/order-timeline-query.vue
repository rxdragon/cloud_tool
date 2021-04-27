<template>
  <div class="order-timeline-query">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- 搜索区域 -->
    <v-container fluid>
      <v-row class="search-title" align="end" dense>
        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <v-text-field
            label="订单号"
            hideDetails
            clearable
            v-model.trim="seachOrder"
            @keyup.native.enter="getData"
          />
        </v-col>
        <v-col cols="12" sm="3" md="4" lg="4" xl="4">
          <v-btn color="primary" @click="getData">查询</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-0" v-if="!loading && orderInfo">
      <!-- 产品信息显示区域 -->
      <ProductDetail :order-info="orderInfo" />

      <!-- 时间线 -->
      <ProductList :order-info="orderInfo" />
    </v-container>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import { Component, Vue } from 'vue-property-decorator'
import ProductDetail from './components/ProductDetail.vue'
import ProductList from './components/ProductList.vue'

@Component({
  components: { ProductList, ProductDetail }
})
export default class OrderTimeLineQuery extends Vue{
  private loading: boolean = false
  private orderInfo: any = null
  private seachOrder: string = ''

  /**
   * @description 获取数据
   */
  async getData () {
    try {
      this.loading = true
      if (!this.seachOrder) {
        this.$message.warning('请输入订单号！')
        return
      }
      const req: any = {
        orderNo: this.seachOrder
      }
      const data = await SearchOrderApi.searchOrderTimeLineByOrderNo(req)
      this.orderInfo = data
    } catch {
      this.$message.warning('此订单号暂无数据！')
    } finally {
      this.loading = false
    }
  }
}
</script>
