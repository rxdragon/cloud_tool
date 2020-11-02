<template>
  <div class="order-card">
    <v-card :loading="orderInfo.loading" elevation="0">
      <v-card-title>{{ orderInfo.recordNo }}</v-card-title>
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">看片订单状态：</span>
            <span class="content">{{ orderInfo.stateCN }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">看片类型：</span>
            <span class="content">{{ orderInfo.watchType === watchType.ONLINE ? '在线看片' : '门店看片' }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">是否转线下看片：</span>
            <span class="content">{{ orderInfo.toOffline ? '是' : '否' }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">创建时间：</span>
            <span class="content">{{ orderInfo.createAt }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">绑定时间：</span>
            <span class="content">{{ orderInfo.bindAt }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">最后一次反馈时间：</span>
            <span class="content">{{ orderInfo.recordLastAt }}</span>
          </v-col>
          <v-col class="pa-0" v-if="orderInfo.deletedAt" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">删除时间：</span>
            <span class="content">{{ orderInfo.deletedAt }}</span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="subtitle-1 pb-0">门店信息：</v-card-title>
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">门店id：</span>
            <span class="content">{{ orderInfo.storeInfo.id }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">门店：</span>
            <span class="content">{{ orderInfo.storeInfo.name }}</span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="subtitle-1 pb-0">其他信息：</v-card-title>
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">看片审核人：</span>
            <span class="content">{{ orderInfo.checkerInfo.id }} - {{ orderInfo.checkerInfo.name }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">用户姓名：</span>
            <span class="content">{{ orderInfo.userInfo.name }}</span>
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            <span class="label">用户手机：</span>
            <span class="content">{{ orderInfo.userInfo.phone }}</span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="subtitle-1 pb-0">订单产品：</v-card-title>
      <v-card-text>
        <v-chip-group column>
          <v-chip v-for="(productItem, productKey) in orderInfo.productInfos" :key="productKey" small>
            {{ productItem }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PictureOnlineOrderInterface, WATCH_TYPE } from '@/model/PictureOnlineOrderModel'

@Component
export default class PictureSearch extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: PictureOnlineOrderInterface

  private watchType = WATCH_TYPE
  
}
</script>

<style lang="less" scoped>
.label {
  display: inline-block;
  width: 127px;
}
</style>
