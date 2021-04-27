<template>
  <div class="product-list">
    <v-container v-for="(productDetail, stateIndex) in orderInfo.reasonAnalyze.productDetail" :key="stateIndex">
      <v-card v-if="orderInfo.record[stateIndex].operationRecord">
        <v-card-title>
          <span>产品状态：</span>
          <v-spacer></v-spacer>
          <span>{{ productDetail.productState }}</span>
        </v-card-title>
        <v-card-text>
          <!-- 操作记录时间线 -->
          <v-card class="ma-3">
            <v-card-title>
              <span>操作记录：</span>
            </v-card-title>
            <v-card-text>
              <v-timeline dense>
                <v-timeline-item
                  v-for="(operationRecord, recordIndex) in orderInfo.record[stateIndex].operationRecord"
                  :key="recordIndex"
                  :color="operationRecord.color"
                  small
                >
                <v-row>
                  <v-col
                    cols="4"
                    v-text="operationRecord.recordState"
                  ></v-col>
                  <v-col
                    class="text-left"
                    cols="8"
                    v-text="operationRecord.recordTime"
                  ></v-col>
                </v-row>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
          <!-- 流水记录时间线 -->
          <v-card v-if="orderInfo.record[stateIndex].streamRecord" class="ma-3">
            <v-card-title>
              <span>流水记录：</span>
            </v-card-title>
            <v-card-text>
              <v-timeline dense>
                <v-timeline-item
                  v-for="(streamRecord, recordIndex) in orderInfo.record[stateIndex].streamRecord"
                  :key="recordIndex"
                  :color="streamRecord.color"
                  small
                >
                <v-row>
                  <v-col
                    cols="4"
                    v-text="streamRecord.recordState"
                  ></v-col>
                  <v-col
                    class="text-left"
                    cols="8"
                    v-text="streamRecord.recordTime"
                  ></v-col>
                </v-row>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
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
.operation-record-content {
  padding: 15px;
  line-height: 29px;
}
</style>
