<template>
  <div class="product-detail">
    <v-row>
      <v-col class="detail-row" cols="12" sm="6">
        <div class="detail-title">检查订单：</div>
        <div class="detail-content">{{ orderInfo.checkOrder }}</div>
      </v-col>
      <v-col class="detail-row" cols="12" sm="6">
        <div class="detail-title">订单状态：</div>
        <div class="detail-content">{{ orderStateInfo }}</div>
      </v-col>
      <v-col class="detail-row" cols="12" sm="6">
        <div class="detail-title">接单：</div>
        <div class="detail-content">{{ receiveInfo }}</div>
      </v-col>
      <v-col class="detail-row" cols="12" sm="6">
        <div class="detail-title">指派：</div>
        <div class="detail-content">{{ orderInfo.reasonAnalyze.pointAt }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ProductDetail extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any

  get receiveInfo () {
    let receive = this.orderInfo.reasonAnalyze.receive
    receive = receive.replace(/;/g, '\n')
    return receive
  }

  get orderStateInfo () {
    let orderStateInfo = this.orderInfo.reasonAnalyze.orderState
    orderStateInfo = orderStateInfo.replace(/[\(, \[, \]]/g, '')
    orderStateInfo = orderStateInfo.replace(/\)/g, '\n')
    return orderStateInfo
  }
}
</script>

<style lang="less" scoped>
.product-detail {
  padding: 20px;
}

.detail-row {
  display: flex;
  padding: 17px 3px 8px 3px;
  line-height: 16px;
  color: #303133;
  text-align: left;
  font-weight: 500;
  font-size: 14px;

  .detail-title {
    flex-shrink: 0;
    width: 80px;
  }

  .detail-content {
    width: 100%;
    word-break: break-all;
    border-bottom: 1px solid #0b0d0f;
    white-space: pre-wrap;
  }
}
</style>
