<template>
  <div class="product-detail">
    <v-container>
      <div class="detail-title">检查订单：</div>
      <div class="detail-content">{{ orderInfo.checkOrder }}</div>
      <div class="detail-title">订单状态：</div>
      <div class="detail-content">{{ orderInfo.reasonAnalyze.orderState }}</div>
      <div class="detail-title">接单：</div>
      <div class="detail-content">{{ orderInfo.reasonAnalyze.receive }}</div>
      <div class="detail-title">指派：</div>
      <div class="detail-content">{{ orderInfo.reasonAnalyze.pointAt }}</div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ProductDetail extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any
}
</script>

<style lang="less" scoped>
.detail-title {
  display: inline-block;
  width: 10%;
  padding: 17px 3px 8px 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #303133;
  text-align: left;
}

.detail-content {
  display: inline-block;
  width: 90%;
  padding: 17px 3px 8px 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #303133;
  text-align: left;
  word-break: break-all;
  border-bottom: 1px solid #0b0d0f;
}
</style>
