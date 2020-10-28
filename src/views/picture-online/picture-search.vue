<template>
  <div class="picture-search">
    <!-- 搜索区域 -->
    <v-row class="search-box" align="end">
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
        cols="3" class="button-box"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="seachData">查询</v-btn>
      </v-col>
    </v-row>
    <!-- 订单展示结果区域 -->
    <div class="search-main">
      <v-row class="search-box" no-gutters>
        <v-col cols="12" sm="6" md="6" lg="6" xl="4" class="order-item pa-2" v-for="orderItem in orderList" :key="orderItem.id">
          <v-card :loading="orderItem.loading">
            <v-card-title>{{ orderItem.recordNo }}</v-card-title>
            <v-card-text>
              <v-row align="center" no-gutters class="mx-0">
                <v-col class="pa-0">看片订单状态：</v-col>
                <v-col class="pa-0">{{ orderItem.stateCN }}</v-col>
              </v-row>
              <v-row align="center" class="mx-0">
                <v-col class="pa-0">看片类型：</v-col>
                <v-col class="pa-0">{{ orderItem.watchType === watchType.ONLINE ? '在线看片' : '门店看片' }}</v-col>
              </v-row>
              <v-row align="center" class="mx-0">
                <v-col class="pa-0">是否转门店看片：</v-col>
                <v-col class="pa-0">{{ orderItem.toOffline ? '是' : '否' }}</v-col>
              </v-row>
              <v-row align="center" class="mx-0">
                <v-col class="pa-0">创建时间：</v-col>
                <v-col class="pa-0">{{ orderItem.createAt }}</v-col>
              </v-row>
              <v-row align="center" class="mx-0">
                <v-col class="pa-0">绑定时间：</v-col>
                <v-col class="pa-0">{{ orderItem.bindAt }}</v-col>
              </v-row>
              <v-row align="center" class="mx-0">
                <v-col class="pa-0">最后一次反馈时间：</v-col>
                <v-col class="pa-0">{{ orderItem.recordLastAt }}</v-col>
              </v-row>
              <v-row v-if="orderItem.deletedAt" align="center" class="mx-0">
                <v-col class="pa-0">删除时间：</v-col>
                <v-col class="pa-0">{{ orderItem.deletedAt }}</v-col>
              </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title class="subtitle-1 pb-0">门店信息：</v-card-title>
            <v-card-text>
              <v-row align="center" no-gutters class="mx-0">
                <v-col class="pa-0">门店id：</v-col>
                <v-col class="pa-0">{{ orderItem.storeInfo.id }}</v-col>
              </v-row>
              <v-row align="center" no-gutters class="mx-0">
                <v-col class="pa-0">门店：</v-col>
                <v-col class="pa-0">{{ orderItem.storeInfo.name }}</v-col>
              </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title class="subtitle-1 pb-0">其他信息：</v-card-title>
            <v-card-text>
              <v-row align="center" no-gutters class="mx-0">
                <v-col class="pa-0">看片审核人：</v-col>
                <v-col class="pa-0">{{ orderItem.checkerInfo.id }} - {{ orderItem.checkerInfo.name }}</v-col>
              </v-row>
              <v-row align="center" no-gutters class="mx-0">
                <v-col class="pa-0">用户姓名：</v-col>
                <v-col class="pa-0">{{ orderItem.userInfo.name }}</v-col>
              </v-row>
              <v-row align="center" no-gutters class="mx-0">
                <v-col class="pa-0">用户手机：</v-col>
                <v-col class="pa-0">{{ orderItem.userInfo.phone }}</v-col>
              </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title class="subtitle-1 pb-0">订单产品：</v-card-title>
            <v-card-text>
              <v-chip-group column>
                <v-chip v-for="(productItem, productKey) in orderItem.productInfos" :key="productKey" small>
                  {{ productItem }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue lighten-1" text @click="checkPhoto">查看照片</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'
import { PictureOnlineOrderInterface, WATCH_TYPE } from '@/model/PictureOnlineOrderModel'

@Component
export default class PictureSearch extends Vue {
  private seachOrderNum: string = 'T2020102479945646'
  private orderList: PictureOnlineOrderInterface[] = []
  private watchType = WATCH_TYPE

  created () {
    this.seachData ()
  }

  /**
   * @description 搜索数据
   */
  async seachData () {
    const req = {
      outsideNo: this.seachOrderNum
    }
    this.orderList = await PictureOnlineApi.getPictureOnlineByOutsideNo(req)
  }

  /**
   * @description 查看照片
   */
  checkPhoto () {
    console.log(1)
  }
  
}
</script>

<style lang="less" scoped>
.no-padding {
  padding: 0;
}

.search-box {
  margin-left: auto;
}
</style>
