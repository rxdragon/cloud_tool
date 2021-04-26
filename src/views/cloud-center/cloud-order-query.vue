<template>
  <div class="oeder-query">
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
            :disabled="Boolean(seachOrder || seachStream)"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <v-text-field
            label="订单号"
            hideDetails
            clearable
            v-model.trim="seachOrder"
            :disabled="Boolean(seachName || seachStream)"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <v-text-field
            label="流水号"
            hideDetails
            clearable
            v-model.trim="seachStream"
            :disabled="Boolean(seachName || seachOrder)"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="12" sm="3" md="1" lg="1" xl="1">
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
      <template v-slot:[`item.queueIndex`]="{ item }">
        <div>
          <span>{{ item.queueIndexs }}</span>
          <div class="urgent-return-state">
            <v-chip
              v-if="item.staticsUrgent"
              class="urgent-state"
              color="pink lighten-4"
              label
              text-color="red darken-1"
              x-small
            >
              急
            </v-chip>
            <v-chip v-if="item.isReturn" color="pink lighten-4" label text-color="red darken-1" x-small>
              审核退回
            </v-chip>
          </div>
        </div>
      </template>
      <template v-slot:[`item.retouchStandard`]="{ item }">
        <div>
          {{ item.retouchStandards }}
          <div class="standard-icon">
            <div v-if="item.retouchStandards == '缦图'" class="retouch-standard-manto"></div>
            <div v-if="item.retouchStandards == '蓝标'" class="retouch-standard-blue"></div>
            <div v-if="item.retouchStandards == '大师'" class="retouch-standard-master"></div>
          </div>
        </div>
      </template>
      <template v-slot:[`item.orderInfo`]="{ item }">
        <div>
          <span class="letter-space1">订单号:</span>{{ item.orderInfos.externalNum }}<br />
          <span class="letter-space1">流水号:</span>{{ item.orderInfos.streamNum }}<br />
          <span class="letter-space2">拍摄产品:</span>{{ item.orderInfos.producName }}<br />
          <span class="letter-space2">照片数量:</span>{{ item.orderInfos.photoCount }}
        </div>
      </template>
      <template v-slot:[`item.retoucher`]="{ item }">
        <div>
          <div v-if="item.retouchers.retoucher">
            {{ '修图师：' + item.retouchers.retoucher }}
          </div>
          <div v-if="!(item.retouchers.retoucherLeader == '-' && item.retouchers.OrgName)">
            {{ '组长：' + item.retouchers.retoucherLeader }}
          </div>
          <div v-if="item.retouchers.OrgName">
            {{ '机构名称：' + item.retouchers.OrgName }}
          </div>
        </div>
      </template>
      <template v-slot:[`item.reviewer`]="{ item }">
        <div>
          {{ item.reviewers }}
        </div>
      </template>
      <template v-slot:[`item.photographerOrgName`]="{ item }">
        <div>
          {{ item.photographerOrgNames }}
        </div>
      </template>
      <template v-slot:[`item.retouchTime`]="{ item }">
        <div>
          {{ item.retouchTimes }}
        </div>
      </template>
      <template v-slot:[`item.waitTime`]="{ item }">
        <div>
          {{ item.waitTimes }}
        </div>
      </template>
      <template v-slot:[`item.state`]="{ item }">
        <div>
          {{ item.states }}
        </div>
      </template>
      <template v-slot:[`item.operation`]="{ item }">
        <v-btn color="success" @click="showDetail(item)">流水详情</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class OrderQueryList extends Vue {
  private loading: any = false
  private seachOrder: string = ''
  private seachName: string = ''
  private seachStream: string = ''
  private headers: object[] = [
    { text: '位置', value: 'queueIndex' },
    { text: '修图标准', value: 'retouchStandard' },
    { text: '订单信息', value: 'orderInfo' },
    { text: '修图师', value: 'retoucher' },
    { text: '审核人', value: 'reviewer' },
    { text: '摄影机构', value: 'photographerOrgName' },
    { text: '修图时间', value: 'retouchTime' },
    { text: '等待时间', value: 'waitTime' },
    { text: '当前状态', value: 'state' },
    { text: '操作', value: 'operation' },
  ]
  private tableData: any = []

  /**
   * @description 显示订单详页面组件
   */
  async showDetail (item: any) {
    const streamId = item.id || ''
    if (!streamId) return this.$message.warning('缺少流水信息')

    this.$router.push({
      name: 'OrderDetail',
      query: { streamId },
    })
  }

  /**
   * @description 搜索表格
   */
  async seachData () {
    if (!this.seachOrder && !this.seachName && !this.seachStream) return this.$message.warning('请输入参数')
    try {
      this.loading = true
      const req: any = {
        page: 1,
        pageSize: 99,
      }
      if (this.seachOrder) req.orderNum = this.seachOrder
      if (this.seachName) req.customerName = this.seachName
      if (this.seachStream) req.streamNum = this.seachStream

      const data = await SearchOrderApi.searchOrderByNameOrderStream(req)
      if (!data.length) this.$message.warning('暂无数据')
      this.tableData = data
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.urgent-return-state {
  display: inline-block;
  margin-left: 10px;
}

.urgent-state {
  display: inline;
  padding: 4px 6px;
  text-align: center;
}

.letter-space1 {
  letter-spacing: 0.345em;
  display: inline-block;
  width: 5em;
  margin: 0%;
  padding: 0%;
}

.letter-space2 {
  display: inline-block;
  width: 5em;
  margin: 0%;
  padding: 0%;
}

.standard-icon {
  display: inline-block;
  width: 16px;
  height: 17px;
  margin-left: 5px;
  vertical-align: text-top;
}

.retouch-standard-manto {
  height: 100%;
  overflow: hidden;
  background-image: url(../../assets/sprites.png);
  background-position: -319px -76px;
  background-size: 660px 260px;
}

.retouch-standard-blue {
  height: 100%;
  overflow: hidden;
  background-image: url(../../assets/sprites.png);
  background-position: -296px -76px;
  background-size: 660px 260px;
}

.retouch-standard-master {
  height: 100%;
  overflow: hidden;
  background-image: url(../../assets/sprites.png);
  background-position: -273px -76px;
  background-size: 660px 260px;
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
  box-shadow: inset 0 4px 8px -5px rgba(50, 50, 50, 0.35), inset 0 -4px 8px -8px rgba(50, 50, 50, 0.35);
}

.v-timeline--dense .v-timeline-item__body {
  max-width: 330px;
  margin-right: auto;
}
</style>
