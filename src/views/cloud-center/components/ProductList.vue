<template>
  <div class="product-list">
    <div class="product-item mb-4" v-for="(productDetail, stateIndex) in orderInfo.reasonAnalyze.productDetail" :key="stateIndex">
      <v-card v-if="orderInfo.record[stateIndex].operationRecord">
        <v-card-title>
          <span>产品状态：</span>
          <v-spacer></v-spacer>
          <span>{{ productDetail.productState }}</span>
        </v-card-title>
       
       <div class="product-content">
         <!-- 操作记录时间线 -->
          <div class="time-line-module">
            <v-card-title>
              <span>操作记录：</span>
            </v-card-title>
            <v-timeline dense>
              <v-timeline-item
                class="timeline-item"
                v-for="(operationRecord, recordIndex) in orderInfo.record[stateIndex].operationRecord"
                :key="recordIndex"
                :color="operationRecord.color"
                small
              >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  v-text="operationRecord.recordState"
                ></v-col>
                <v-col
                  class="text-left"
                  cols="12"
                  v-text="operationRecord.recordTime"
                ></v-col>
              </v-row>
              </v-timeline-item>
            </v-timeline>
          </div>
          
          <!-- 流水记录时间线 -->
          <div class="time-line-module" v-if="orderInfo.record[stateIndex].streamRecord">
            <v-card-title>
              <span>流水记录：</span>
            </v-card-title>
            <v-timeline dense>
              <v-timeline-item
                v-for="(streamRecord, recordIndex) in orderInfo.record[stateIndex].streamRecord"
                :key="recordIndex"
                :color="streamRecord.color"
                small
              >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  v-text="streamRecord.recordState"
                ></v-col>
                <v-col
                  class="text-left"
                  cols="12"
                  v-text="streamRecord.recordTime"
                ></v-col>
              </v-row>
              </v-timeline-item>
            </v-timeline>
          </div>
       </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ProductList extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any
}
</script>

<style lang="less" scoped>
.time-line-module {
  font-size: 14px;
  padding-bottom: 20px;
}
</style>
