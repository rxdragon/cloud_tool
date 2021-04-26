<template>
  <div class="product-list">
    <v-row v-for="(productDetail, stateIndex) in orderInfo.reasonAnalyze.productDetail" :key="stateIndex">
      <v-col>
        <v-card>
          <v-card-title>
            <span>产品状态：</span>
            <v-spacer></v-spacer>
            <span>{{ productDetail.productState }}</span>
          </v-card-title>
          <v-card-text>
            <v-card class="timeline-operation-record">
              <v-card-title>
                <span>操作记录：</span>
              </v-card-title>
              <v-card-text>
                <v-card-text>
                  <v-timeline>
                    <v-timeline-item
                      v-for="(operationRecord, recordIndex) in orderInfo.record[stateIndex].operationRecord"
                      :key="recordIndex"
                      small
                    >
                    <template v-slot:opposite>
                      <span>{{ operationRecord.recordState }}</span>
                    </template>
                      <v-card class="operation-record-content">{{ operationRecord.recordTime }}</v-card>
                    </v-timeline-item>
                  </v-timeline>
                </v-card-text>
              </v-card-text>
            </v-card>
            <v-card class="timeline-stream-record">
              <v-card-title>
                <span>流水记录：</span>
              </v-card-title>
              <v-card-text>
                <v-timeline>
                  <v-timeline-item
                    v-for="(streamRecord, recordIndex) in orderInfo.record[stateIndex].streamRecord"
                    :key="recordIndex"
                    small
                  >
                    <template v-slot:opposite>
                      <span>{{ streamRecord.recordState }}</span>
                    </template>
                    <v-card class="operation-record-content">{{ streamRecord.recordTime }}</v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ProductList extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any
}
</script>

<style lang="less" scoped>
.operation-record-content {
  padding: 15px;
  line-height: 29px;
}

.timeline-title {
  margin: 12px;
}

.timeline-operation-record {
  margin: 12px;
}

.timeline-stream-record {
  margin: 12px;
}
</style>
