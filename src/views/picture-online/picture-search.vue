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
      <div class="order-item pa-2" v-for="orderItem in orderList" :key="orderItem.id">
        <v-card :loading="orderItem.loading">
          <v-card-title>{{ orderItem.recordNo }}</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                看片订单状态：{{ orderItem.stateCN }}
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                看片类型：{{ orderItem.watchType === watchType.ONLINE ? '在线看片' : '门店看片' }}
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                是否转门店看片：{{ orderItem.toOffline ? '是' : '否' }}
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                创建时间：{{ orderItem.createAt }}
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                绑定时间：{{ orderItem.bindAt }}
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                最后一次反馈时间：{{ orderItem.recordLastAt }}
              </v-col>
              <v-col class="pa-0" v-if="orderItem.deletedAt" cols="12" sm="6" md="4" lg="4" xl="4">
                删除时间：{{ orderItem.deletedAt }}
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title class="subtitle-1 pb-0">门店信息：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                门店id：{{ orderItem.storeInfo.id }}
              </v-col>
             <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                门店：{{ orderItem.storeInfo.name }}
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title class="subtitle-1 pb-0">其他信息：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                看片审核人：{{ orderItem.checkerInfo.id }} - {{ orderItem.checkerInfo.name }}
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                用户姓名：{{ orderItem.userInfo.name }}
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                用户手机：{{ orderItem.userInfo.phone }}
              </v-col>
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
            <v-btn color="blue lighten-1" text @click="checkPhoto(orderItem.id)">查看照片</v-btn>
          </v-card-actions>
        </v-card>
      </div>
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
  async checkPhoto (recordId: string | number) {
    const req = { recordId }
    await PictureOnlineApi.getPhotoListByRecordId(req)
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
