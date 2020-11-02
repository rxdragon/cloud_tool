<template>
  <div class="picture-search">
    <!-- 搜索区域 -->
    <v-row class="search-box" align="end" no-gutters>
      <v-col cols="9" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          label="流水号"
          hideDetails
          clearable
          v-model.trim="seachOrderNum"
          @keyup.native.enter="seachData"
        />
      </v-col>
      <v-col
        cols="3" class="button-box pl-6"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="seachData">查询</v-btn>
      </v-col>
    </v-row>

    <!-- 订单展示结果区域 -->
    <div class="search-main mt-3">
      <template v-for="orderItem in orderList">
        <v-tabs
          :key="orderItem.id"
          v-model="orderItem.tab"
          background-color="primary"
          class="elevation-0"
          dark
          grow
        >
          <v-tab href="#order">订单信息</v-tab>
          <v-tab href="#photo">照片信息</v-tab>

          <v-tab-item value="order" >
            <order-card :order-info="orderItem" />
          </v-tab-item>
          <v-tab-item value="photo" >
            <photo-card :order-id="orderItem.id" />
          </v-tab-item>
        </v-tabs>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'
import { PictureOnlineOrderInterface } from '@/model/PictureOnlineOrderModel'
import OrderCard from './components/OrderCard.vue'
import PhotoCard from './components/PhotoCard.vue'

@Component({
  components: { OrderCard, PhotoCard }
})
export default class PictureSearch extends Vue {
  private seachOrderNum: string = ''
  private orderList: PictureOnlineOrderInterface[] = []

  /**
   * @description 搜索数据
   */
  async seachData () {
    const req = {
      outsideNo: this.seachOrderNum
    }
    this.orderList = await PictureOnlineApi.getPictureOnlineByOutsideNo(req)
  }
}
</script>

<style lang="less" scoped>
.search-box {
  margin-left: auto;
}

.search-main {
  .tabs-box {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>
