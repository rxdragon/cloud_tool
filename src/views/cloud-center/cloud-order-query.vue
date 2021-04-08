<template>
  <div class="rework-table-list">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- 搜索区域 -->
    <v-container fluid>
      <v-row class="search-title" align="end" dense>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <v-text-field
            label="顾客姓名"
            hideDetails
            clearable
            v-model.trim="seachName"
            :disabled='disableName'
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <v-text-field
            label="订单号"
            hideDetails
            clearable
            v-model.trim="seachOrder"
            :disabled='disableOrder'
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <v-text-field
            label="流水号"
            hideDetails
            clearable
            v-model.trim="seachStream"
            :disabled="disableStream"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="12" sm="1" md="3" lg="3" xl="3">
          <v-btn color="primary" @click="seachData">查询</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- 查询结果区域 -->
    <v-data-table
      v-if="tableData.length"
      :headers="headers"
      :items="tableData"
      hide-default-footer
      disable-pagination
      disable-sort
    >
      <template v-slot:item.queueIndexs="{ item }">
        <div class="index-box">
            <span>{{ item.queue_index || '-' }}</span>
            <div class="icon-box">
              <span v-if="item.staticsUrgent" type="danger" size="mini">急</span>
              <span v-if="item.isReturn" type="danger" size="mini">审核退回</span>
            </div>
          </div>
      </template>
      <template v-slot:item.retouchStandards="{ item }">
        <div>
          {{ item.retouchType || '-' }}
        </div>
      </template>
      <template v-slot:item.orderInfos="{ item }">
        <div>
          <span class="letter-space">订单号:</span>{{ item.order && item.order.external_num || '-' }}<br />
          <span class="letter-space">流水号:</span>{{ item.stream_num || '-' }}<br />
          <span>拍摄产品:</span>{{ item.product.name || '-' }}<br />
          <span>照片数量:</span>{{ item.photos.length }}
        </div>
      </template>
      <template v-slot:item.retouchers="{ item }">
        <div>
          {{ "修图师：" + item.retoucher.name || '-' }}<br />
          {{ "组长：" + item.retoucher_leader.name || '-' }}
        </div>
      </template>
      <template v-slot:item.reviewers="{ item }">
        <div>
          {{ item.reviewerName || '-' }}
        </div>
      </template>
      <template v-slot:item.photographerOrgNames="{ item }">
        <div>
          {{ item.photographerOrgName || '-' }}
        </div>
      </template>
      <template v-slot:item.retouchTimes="{ item }">
        <div>
          {{ item.retouchTime || '-' }}
        </div>
      </template>
      <template v-slot:item.waitTimes="{ item }">
        <div>
          {{ item.waitTime || '-' }}
        </div>
      </template>
      <template v-slot:item.states="{ item }">
        <div>
          {{ item.streamState || '-' }}
        </div>
      </template>
      <template v-slot:item.operations="{ item }">
        <div>
          {{ item.operation || '-' }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import { flatten } from 'lodash'
import { Component, Vue, Watch } from "vue-property-decorator"

@Component
export default class ReworkTableList extends Vue {
  private loading: boolean = false
  private disableName: boolean = false
  private disableOrder: boolean = false
  private disableStream: boolean = false
  private seachOrder: string = ""
  private seachName: string = ""
  private seachStream: string = ""
  private headers: object[] = [
    { text: "位置", value: "queueIndexs" },
    { text: "修图标准", value: "retouchStandards" },
    { text: "订单信息", value: "orderInfos" },
    { text: "修图师", value: "retouchers" },
    { text: "审核人", value: "reviewers" },
    { text: "摄影机构", value: "photographerOrgNames" },
    { text: "修图时间", value: "retouchTimes" },
    { text: "等待时间", value: "waitTimes" },
    { text: "当前状态", value: "states" },
    { text: "操作", value: "operations" },
    { text: "", value: "data-table-expand" },
  ]
  private tableData: any = []

  /**
   * @description 只允许单一条件搜索
   */
  @Watch("seachName", { immediate: true })
  private disableInputExcName () {
    if (this.seachName) {
      this.disableOrder = true
      this.disableStream = true
    }
    else {
      this.disableOrder = false
      this.disableStream = false
    }
  }

  @Watch("seachStream", { immediate: true })
  private disableInputExcStream () {
    if (this.seachStream) {
      this.disableOrder = true
      this.disableName = true
    }
    else {
      this.disableOrder = false
      this.disableName = false
    }
  }

  @Watch("seachOrder", { immediate: true })
  private disableInputExcOrder () {
    if (this.seachOrder) {
      this.disableName = true
      this.disableStream = true
    }
    else {
      this.disableName = false
      this.disableStream = false
    }
  }
  /**
   * @description 搜索表格
   */
  async seachData () {
    this.disableName = false
    this.disableStream = false
    this.disableOrder = false
    if (!this.seachOrder && !this.seachName && !this.seachStream) return this.$message.warning('请输入参数')

    try {
      this.loading = true
      const req: any = {
        page: 1,
        pageSize: 99
      }
      if (this.seachOrder) req.orderNum = this.seachOrder
      if (this.seachName) req.customerName = this.seachName
      if (this.seachStream) req.streamNum = this.seachStream

      const data = await SearchOrderApi.searchOrderByOutsideNo(req)

      console.log(data)
      if (!data.length) this.$message.warning('暂无数据')
      this.tableData = data
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
  width: 5em;
  margin: 0%;
  padding: 0%;
}

.letter-space {
  letter-spacing: 0.345em;
}

.search-title {
  display: flex;
  justify-content: space-between;
}

.flex-item {
  display: flex;
  justify-content: space-between;
  padding-top: 0;
}

.divider-box {
  padding-bottom: 16px;
}
</style>


<style lang="scss">
.v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: inset 0 4px 8px -5px rgba(50, 50, 50, 0.35),
    inset 0 -4px 8px -8px rgba(50, 50, 50, 0.35);
}

.v-timeline--dense .v-timeline-item__body {
  max-width: 330px;
  margin-right: auto;
}
</style>
